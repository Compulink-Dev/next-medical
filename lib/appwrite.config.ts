import * as sdk from 'node-appwrite'

export const {
    NEXT_PUBLIC_APPWRITE_PROJECT_ID: PROJECT_ID,
    NEXT_PUBLIC_APPWRITE_ENDPOINT: ENDPOINT,
    NEXT_PUBLIC_APPWRITE_API_KEY: API_KEY,
    NEXT_PUBLIC_DATABASE_ID: DATABASE_ID,
    NEXT_PUBLIC_PATIENT_COLLECTION_ID: PATIENT_COLLECTION_ID,
    NEXT_PUBLIC_DOCTOR_COLLECTION_ID: DOCTOR_COLLECTION_ID,
    NEXT_PUBLIC_NURSE_COLLECTION_ID: NURSE_COLLECTION_ID,
    NEXT_PUBLIC_CLINIC_COLLECTION_ID: CLINIC_COLLECTION_ID,
    NEXT_PUBLIC_MEDICINE_COLLECTION_ID: MEDICINE_COLLECTION_ID,
    NEXT_PUBLIC_APPOINTMENT_COLLECTION_ID: APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env

console.log("Environment Variables:");
console.log({
    PROJECT_ID,
    ENDPOINT,
    API_KEY,
    DATABASE_ID,
    PATIENT_COLLECTION_ID,
    DOCTOR_COLLECTION_ID,
    NURSE_COLLECTION_ID,
    CLINIC_COLLECTION_ID,
    MEDICINE_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    BUCKET_ID,
});


console.log("Appwrite Endpoint:", process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "Not defined");
console.log("Appwrite Project ID:", process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "Not defined");

if (!process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) {
    throw new Error("Missing Appwrite configuration in environment variables.");
}

const client = new sdk.Client()

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_API_KEY!)

export const account = new sdk.Account(client)
export const databases = new sdk.Databases(client)
export const storage = new sdk.Storage(client)
export const users = new sdk.Users(client)
export const messaging = new sdk.Messaging(client)
