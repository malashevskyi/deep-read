import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { App } from 'firebase-admin/app';
import { getStorage, Storage } from 'firebase-admin/storage';
import { Logger } from '@nestjs/common';

const BUCKET_DIRECTORY = 'audio';

const getFirebaseCredentials = (serviceAccountString: string) => {
  try {
    return JSON.parse(serviceAccountString);
  } catch (error) {
    throw new Error('Invalid FIREBASE_SERVICE_ACCOUNT_KEY_JSON format.');
  }
};

@Injectable()
export class FirebaseStorageAdapter implements OnModuleInit {
  private readonly logger = new Logger(FirebaseStorageAdapter.name);
  private bucketName: string;
  private storage: Storage;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    try {
      const serviceAccountJson = this.configService.getOrThrow<string>(
        'FIREBASE_SERVICE_ACCOUNT_KEY_JSON',
      );
      const bucketName = this.configService.getOrThrow<string>(
        'FIREBASE_STORAGE_BUCKET',
      );
      const projectName = this.configService.getOrThrow<string>('PROJECT_NAME');

      let credentials: admin.ServiceAccount =
        getFirebaseCredentials(serviceAccountJson);

      this.bucketName = bucketName;

      let app: App;

      const existingApp = admin.apps.find((app) => app?.name === projectName);

      if (existingApp) {
        app = existingApp;
        this.logger.log(`Using existing Firebase App: "${projectName}"`);
      } else {
        app = admin.initializeApp(
          {
            credential: admin.credential.cert(credentials),
            storageBucket: this.bucketName,
          },
          projectName,
        );
        this.logger.log(`Firebase App "${projectName}" initialized.`);
      }

      this.storage = getStorage(app);
      this.logger.log('Firebase Storage client initialized successfully.');
    } catch (error) {
      this.logger.error('Failed to initialize Firebase Admin SDK', error);
      throw error;
    }
  }

  /**
   * Uploads an audio file to Firebase Storage and returns a signed URL.
   * @param buffer - The audio file buffer to upload.
   * @param text - A text string used to generate the file name.
   * @returns A promise resolving to an object containing the public URL and storage path.
   * @throws {AppError} If the upload or URL generation fails.
   */
  async uploadAudio(
    buffer: Buffer,
    text: string,
  ): Promise<{ publicUrl: string; storagePath: string }> {
    const fileName = `${text.replace(/\s/g, '_')}.mp3`;
    const storagePath = `${BUCKET_DIRECTORY}/${fileName}`;
    const file = this.storage.bucket(this.bucketName).file(storagePath);

    const [exists] = await file.exists();
    if (exists) await file.delete();

    await file.save(buffer, {
      metadata: { contentType: 'audio/mpeg' },
      resumable: false,
    });

    const farFutureDate = new Date();
    farFutureDate.setFullYear(farFutureDate.getFullYear() + 100);

    const [publicUrl] = await file.getSignedUrl({
      action: 'read',
      expires: farFutureDate,
    });

    this.logger.log(`Successfully uploaded file: ${storagePath}`);

    return { publicUrl, storagePath };
  }
}
