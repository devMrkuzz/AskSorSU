// scripts/importKnowledge.tsx
import fs from "fs";
import path from "path";
import { Client, Databases, ID } from "appwrite";
import csv from "csv-parser";

// Load environment variables
import "dotenv/config";

const client = new Client()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || "")
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT || "");

const databases = new Databases(client);

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID!;

// CSV file path (root of your project)
const csvFilePath = path.join(process.cwd(), "knowledge.csv");

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

importKnowledge().catch((err) => {
  console.error("❌ Import failed:", err);
});
