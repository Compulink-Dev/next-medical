"use server";
import { ID, Query } from "node-appwrite";
import { InputFile } from "node-appwrite/file";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  NURSE_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
  account,
} from "../appwrite.config";
import { parseStringify } from "../utils";

// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      user.password,
      user.name
    );

    return parseStringify(newUser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterPatientParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...patient,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

export const checkUserExists = async () => {
  try {
    const users = await account.listSessions();
    console.log("users", users);

    return users;
  } catch (error) {
    console.error(error);
    return false;
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0] ?? null);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};

// UPDATE PATIENT
export const updatePatient = async (
  patientId: string,
  updatedData: Partial<RegisterPatientParams>
) => {
  try {
    const updatedPatient = await databases.updateDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      patientId,
      updatedData
    );

    return parseStringify(updatedPatient);
  } catch (error) {
    console.error(
      "An error occurred while updating the patient details:",
      error
    );
    return null;
  }
};

// GET ALL PATIENTS
export const getAllPatients = async () => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!
    );

    return patients.documents.map((document) => parseStringify(document));
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};

export async function getAllPatientID(clinicId: string) {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("clinic", clinicId)] // Match clinic ID
    );
    return response.documents;
  } catch (error) {
    console.error("Error fetching patients:", error);
    return [];
  }
}

// GET ALL RECENT PATIENTS
export const getRecentPatientsList = async () => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const data = {
      totalCount: patients.total,
      documents: patients.documents,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent patients:",
      error
    );
  }
};

// REGISTER NURSE
export const registerNurse = async ({
  identificationDocument,
  ...nurse
}: RegisterNurseParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBuffer(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newNurse = await databases.createDocument(
      DATABASE_ID!,
      NURSE_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...nurse,
      }
    );

    return parseStringify(newNurse);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET NURSE
export const getNurse = async (userId: string) => {
  try {
    const nurses = await databases.listDocuments(
      DATABASE_ID!,
      NURSE_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(nurses.documents[0] ?? null);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
  }
};

// GET ALL NURSE
export const getAllNurses = async () => {
  try {
    const nurses = await databases.listDocuments(
      DATABASE_ID!,
      NURSE_COLLECTION_ID!
    );

    return nurses.documents.map((document) => parseStringify(document));
  } catch (error) {
    console.error(
      "An error occurred while retrieving the nurse details:",
      error
    );
  }
};

// GET ALL RECENT NURSE
export const getRecentNursesList = async () => {
  try {
    const nurses = await databases.listDocuments(
      DATABASE_ID!,
      NURSE_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const data = {
      totalCount: nurses.total,
      documents: nurses.documents,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent nurses:",
      error
    );
  }
};
