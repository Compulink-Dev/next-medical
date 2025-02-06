import * as sdk from "node-appwrite";

export const {
  NEXT_PUBLIC_PROJECT_ID: PROJECT_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
  NEXT_PUBLIC_API_KEY: API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  NURSE_COLLECTION_ID,
  CLINIC_COLLECTION_ID,
  MEDICINE_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  TREATMENT_COLLECTION_ID,
  PRESCRIPTION_COLLECTION_ID,
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

if (!process.env.NEXT_PUBLIC_ENDPOINT || !process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error("Missing Appwrite configuration in environment variables.");
}

const client = new sdk.Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_ENDPOINT!)
  .setProject(process.env.NEXT_PUBLIC_PROJECT_ID!)
  .setKey(process.env.NEXT_PUBLIC_API_KEY!);

export const account = new sdk.Account(client);
export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
