import { Client, Account, Databases } from "appwrite";

// Initialize Appwrite Client
const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || "693b5308001cb1d4f1f7");

// Export services
export const account = new Account(client);
export const databases = new Databases(client);

export default client;
