import * as Sentry from "@sentry/node";
import * as admin from "firebase-admin";
import { defineString } from "firebase-functions/params";

const dsn = defineString("SENTRY_DSN", { default: "" });

if (dsn) {
  Sentry.init({
    dsn: dsn.value(),
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
  });
}

admin.initializeApp();
