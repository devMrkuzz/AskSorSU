"use server";

import { Databases, Query } from "appwrite";
import client from "@/lib/appwrite";

const databases = new Databases(client);

export async function findKnowledge(userQuestion: string) {
  try {
    console.log("🔍 Searching for:", userQuestion);

    const keywords = userQuestion.toLowerCase().split(/\s+/);
    console.log("🧩 Keywords:", keywords);

    const queries = keywords.map((word) => Query.search("keywords", word));
    console.log("📋 Queries built:", queries);

    const dbId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!;
    const colId = process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID!;

    console.log("📚 Database ID:", dbId);
    console.log("📘 Collection ID:", colId);

    const response = await databases.listDocuments(dbId, colId, queries);

    console.log("✅ Raw response from Appwrite:", JSON.stringify(response, null, 2));

    if (response.documents.length > 0) {
      console.log("🎯 Best match:", response.documents[0]);
      return response.documents[0].answer;
    }

    return "Sorry, I couldn't find any information related to your question.";
   } catch (error: any) {
    console.error("❌ Full Appwrite error object:", JSON.stringify(error, null, 2));

    if (error?.response) {
      console.error("📩 Appwrite response error:", JSON.stringify(error.response, null, 2));
    }

    return "Sorry, something went wrong while fetching the answer.";
  }

}
