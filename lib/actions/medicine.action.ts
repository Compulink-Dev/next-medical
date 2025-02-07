"use server";
import { ID, Query } from "node-appwrite";
import {
  MEDICINE_COLLECTION_ID,
  DATABASE_ID,
  databases,
} from "../appwrite.config";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";

// CREATE MEDICINE
export const createMedicine = async (clinic: CreateMedicineParams) => {
  try {
    const newMedicine = await databases.createDocument(
      DATABASE_ID!,
      MEDICINE_COLLECTION_ID!,
      ID.unique(),
      clinic
    );

    revalidatePath("/admin");
    revalidatePath("/dashboard/medicines");
    return parseStringify(newMedicine);
  } catch (error) {
    console.error("An error occurred while creating a new medicine:", error);
  }
};

// In medicine.actions.ts
export const updateMedicine = async (
  medicineId: string,
  medicineData: {
    name: string;
    category: string;
    stock: string;
    dosage: string;
    unit: string;
    frequency: string;
    price: string;
    expiryDate: Date;
    status: string;
  }
) => {
  try {
    const updatedMedicine = await databases.updateDocument(
      DATABASE_ID!,
      MEDICINE_COLLECTION_ID!,
      medicineId,
      medicineData
    );

    return parseStringify(updatedMedicine); // Make sure this returns the updated medicine correctly
  } catch (error) {
    console.error("Error while updating medicine:", error);
  }
};

// GET MEDICINE
export const getMedicine = async (userId: string) => {
  try {
    const medicines = await databases.listDocuments(
      DATABASE_ID!,
      MEDICINE_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(medicines.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the medicine details:",
      error
    );
  }
};

// GET ALL MEDICINE
export const getAllMedicines = async () => {
  try {
    const medicines = await databases.listDocuments(
      DATABASE_ID!,
      MEDICINE_COLLECTION_ID!
    );

    return medicines.documents.map((document) => parseStringify(document));
  } catch (error) {
    console.error(
      "An error occurred while retrieving the medicine details:",
      error
    );
  }
};

//  GET RECENT MEDICINE
export const getRecentMedicineList = async () => {
  try {
    const medicines = await databases.listDocuments(
      DATABASE_ID!,
      MEDICINE_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const data = {
      totalCount: medicines.total,
      documents: medicines.documents,
    };

    return data;
  } catch (error) {
    console.error(
      "An error occurred while retrieving the recent medicines:",
      error
    );
  }
};
