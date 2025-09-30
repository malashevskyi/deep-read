import { Module, Global } from '@nestjs/common';
import { ErrorService } from './errors.service';

@Global()
@Module({
  providers: [ErrorService],
  exports: [ErrorService],
})
export class ErrorsModule {}
