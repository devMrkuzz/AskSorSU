import { Client, Account } from "appwrite";

const client = new Client();

// Use environment variables for flexibility between localhost and production
client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "693b5308001cb1d4f1f7");

export const account = new Account(client);
export default client;
