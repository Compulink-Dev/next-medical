'use server'
import { ID, Query } from "node-appwrite";
import {
    CLINIC_COLLECTION_ID,
    DATABASE_ID,
    databases
} from "../appwrite.config";
import { revalidatePath } from "next/cache";
import { parseStringify } from "../utils";


// CREATE CLINIC
export const createClinic = async (
    clinic: CreateClinicParams
) => {
    console.log('Database ID:', DATABASE_ID);

    try {
        const newClinic = await databases.createDocument(
            DATABASE_ID!,
            CLINIC_COLLECTION_ID!,
            ID.unique(),
            clinic
        );

        revalidatePath("/admin");
        return parseStringify(newClinic);
    } catch (error) {
        console.error("An error occurred while creating a new clinic:", error);
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

// GET ALL CLINICS
export const getAllClinics = async () => {
    try {
        const clinics = await databases.listDocuments(
            DATABASE_ID!,
            CLINIC_COLLECTION_ID!
        );

        return clinics.documents.map(document => parseStringify(document));
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