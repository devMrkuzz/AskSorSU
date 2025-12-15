// lib/appwrite.ts
import { Client, Account, Databases } from "appwrite";
import { Client as NodeClient } from "node-appwrite"; // ✅ for server-side use

let client: any;

// ✅ For browser (frontend)
if (typeof window !== "undefined") {
  client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "693b5308001cb1d4f1f7");
    
} else {
  // ✅ For server (Next.js backend)
  client = new NodeClient()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "https://fra.cloud.appwrite.io/v1")
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "693b5308001cb1d4f1f7")
    .setKey(process.env.APPWRITE_API_KEY || "");
}

export const account = new Account(client);
export const databases = new Databases(client);

export default client;
