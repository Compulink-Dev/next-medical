"use server";
import { ID, Query } from "node-appwrite";
import {
  TREATMENT_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

// CREATE TREATMENT
export const createTreatment = async (treatment: CreateTreatmentParams) => {
  try {
    const newTreatment = await databases.createDocument(
      DATABASE_ID!,
      TREATMENT_COLLECTION_ID!,
      ID.unique(),
      treatment
    );
    revalidatePath("/admin");
    revalidatePath("/dashboard/health");
    return parseStringify(newTreatment);
  } catch (error) {
    console.error("An error occurred while creating a new treatment:", error);
  }
};

// UPDATE TREATMENT
export const updateTreatment = async (
  treatmentId: string,
  treatmentData: { name: string; email: string; phone: string; address: string }
) => {
  try {
    const updatedTreatment = await databases.updateDocument(
      DATABASE_ID!,
      TREATMENT_COLLECTION_ID!,
      treatmentId,
      treatmentData
    );

    return parseStringify(updatedTreatment); // Make sure this returns the updated clinic correctly
  } catch (error) {
    console.error("Error while updating treatment:", error);
  }
};

// GET TREATMENT
export const getTreatment = async (userId: string) => {
  try {
    const treatment = await databases.listDocuments(
      DATABASE_ID!,
      TREATMENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(treatment.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the treatment details:",
      error
    );
  }
};

// DELETE TREATMENT
export const deleteTreatment = async (treatmentId: string) => {
  try {
    await databases.deleteDocument(
      DATABASE_ID!,
      TREATMENT_COLLECTION_ID!,
      treatmentId
    );

    console.log(
      `Treatment with ID ${treatmentId} has been deleted successfully.`
    );
    return true; // Optionally, return a value to indicate success
  } catch (error) {
    console.error("An error occurred while deleting the treatment:", error);
    return false; // Optionally, return a value to indicate failure
  }
};

// GET ALL TREATMENTS
export const getAllTreatments = async () => {
  try {
    const treatment = await databases.listDocuments(
      DATABASE_ID!,
      TREATMENT_COLLECTION_ID!
    );

    return treatment.documents.map((document) => parseStringify(document));
  } catch (error) {
    console.error(
      "An error occurred while retrieving the treatment details:",
      error
    );
  }
};

//  GET RECENT TREATMENTS
export const getRecentTreatmentList = async () => {
  try {
    const treatment = await databases.listDocuments(
      DATABASE_ID!,
      TREATMENT_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const data = {
      totalCount: treatment.total,
      documents: treatment.documents,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent treatment:",
      error
    );
  }
};
