import { initializeApp, cert, getApps, AppOptions, App } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
import { getAuth, Auth } from "firebase-admin/auth";

const getFirebaseConfig = (): AppOptions => {
  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (!FIREBASE_PROJECT_ID || !FIREBASE_CLIENT_EMAIL || !FIREBASE_PRIVATE_KEY) {
    throw new Error(
      "Missing Firebase credentials. Please check your .env file."
    );
  }

  return {
    credential: cert({
      projectId: FIREBASE_PROJECT_ID,
      clientEmail: FIREBASE_CLIENT_EMAIL,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  };
};

const initializeFirebaseAdmin = (): App => {
  const existingApp = getApps()[0];
  if (existingApp) return existingApp;
  return initializeApp(getFirebaseConfig());
};

const app: App = initializeFirebaseAdmin();
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };
