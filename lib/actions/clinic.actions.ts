"use server";
import { ID, Query } from "node-appwrite";
import {
  CLINIC_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

// CREATE CLINIC
export const createClinic = async (clinic: CreateClinicParams) => {
  try {
    const newClinic = await databases.createDocument(
      DATABASE_ID!,
      CLINIC_COLLECTION_ID!,
      ID.unique(),
      clinic
    );

    revalidatePath("/admin");
    revalidatePath("/dashboard/clinics");
    return parseStringify(newClinic);
  } catch (error) {
    console.error("An error occurred while creating a new clinic:", error);
  }
};

// In clinic.actions.ts
export const updateClinic = async (
  clinicId: string,
  clinicData: { name: string; email: string; phone: string; address: string }
) => {
  try {
    const updatedClinic = await databases.updateDocument(
      DATABASE_ID!,
      CLINIC_COLLECTION_ID!,
      clinicId,
      clinicData
    );

    return parseStringify(updatedClinic); // Make sure this returns the updated clinic correctly
  } catch (error) {
    console.error("Error while updating clinic:", error);
  }
};

// GET CLINIC
export const getClinic = async (userId: string) => {
  try {
    const clinics = await databases.listDocuments(
      DATABASE_ID!,
      CLINIC_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(clinics.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the clinic details:",
      error
    );
  }
};

// DELETE CLINIC
export const deleteClinic = async (clinicId: string) => {
  try {
    await databases.deleteDocument(
      DATABASE_ID!,
      CLINIC_COLLECTION_ID!,
      clinicId
    );
    return true; // Optionally, return a value to indicate success
  } catch (error) {
    console.error("An error occurred while deleting the clinic:", error);
    return false; // Optionally, return a value to indicate failure
  }
};

// GET ALL CLINICS
export const getAllClinics = async () => {
  try {
    const clinics = await databases.listDocuments(
      DATABASE_ID!,
      CLINIC_COLLECTION_ID!
    );

    return clinics.documents.map((document) => parseStringify(document));
  } catch (error) {
    console.error(
      "An error occurred while retrieving the clinic details:",
      error
    );
  }
};

//  GET RECENT CLINIC
export const getRecentClinicList = async () => {
  try {
    const clinics = await databases.listDocuments(
      DATABASE_ID!,
      CLINIC_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const data = {
      totalCount: clinics.total,
      documents: clinics.documents,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent clinics:",
      error
    );
  }
};
