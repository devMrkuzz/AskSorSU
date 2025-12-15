// scripts/importKnowledge.tsx
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import fs from "fs";
import path from "path";
import { Client, Databases, ID, Permission, Role } from "node-appwrite"; // ✅ USE "node-appwrite" instead of "appwrite"
import csv from "csv-parser";

// ✅ Initialize Appwrite client
const client = new Client()
  .setEndpoint(
    process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
      "https://fra.cloud.appwrite.io/v1"
  )
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "")
  .setKey(process.env.APPWRITE_API_KEY || ""); // ✅ Now works on node-appwrite

const databases = new Databases(client);

// ✅ Read IDs from .env
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID!;

// ✅ Path to your CSV file (adjust if inside /data)
const csvFilePath = path.join(process.cwd(), "data", "knowledge_registrar.csv");

async function importKnowledge() {
  console.log("📂 Starting import from:", csvFilePath);

  const records: any[] = [];

  // 1️⃣ Read CSV file
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => records.push(row))
      .on("end", resolve)
      .on("error", reject);
  });

  console.log(`✅ Found ${records.length} records to import.`);

  // 2️⃣ Insert each record into Appwrite
  for (const record of records) {
    try {
      await databases.createDocument(databaseId, collectionId, ID.unique(), {
        title: record.title,
        category: record.category,
        audience: record.audience,
        question: record.question,
        answer: record.answer,
        keywords: record.keywords,
      });

      console.log(`✅ Added: ${record.title}`);
    } catch (error: any) {
      console.error(`❌ Failed to add "${record.title}":`, error.message);
    }
  }

  console.log("🎉 Import complete!");
}

// ✅ Run the import process
importKnowledge().catch((err) => {
  console.error("❌ Import failed:", err);
});
