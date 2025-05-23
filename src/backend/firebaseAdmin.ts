// src/backend/firebaseAdmin.ts
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export const adminAuth = admin.auth();
