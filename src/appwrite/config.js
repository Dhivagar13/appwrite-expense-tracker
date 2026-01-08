import { Client, Account, Databases } from 'appwrite';

export const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_ENDPOINT),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_EXPENSES),
}

console.log("Appwrite Config Loaded:", {
    url: conf.appwriteUrl,
    projectId: conf.appwriteProjectId,
    databaseId: conf.appwriteDatabaseId,
    collectionId: conf.appwriteCollectionId
});

export const client = new Client();

client
    .setEndpoint(conf.appwriteUrl)
    .setProject(conf.appwriteProjectId);

export const account = new Account(client);
export const databases = new Databases(client);