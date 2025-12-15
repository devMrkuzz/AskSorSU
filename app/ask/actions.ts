"use server";

import { Databases, Query } from "node-appwrite";
import client from "@/lib/appwrite";

const databases = new Databases(client);

export async function findKnowledge(userQuestion: string) {
  try {
    const cleanedQuestion = userQuestion.toLowerCase().trim();

    // Build flexible search queries
    const queries = [
      Query.search("keywords", cleanedQuestion),
      Query.search("question", cleanedQuestion),
      Query.search("title", cleanedQuestion),
    ];

    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID!,
      queries
    );

    if (response.documents.length > 0) {
      console.log("✅ Found:", response.documents[0].title);
      return response.documents[0].answer;
    } else {
      console.warn("⚠️ No match found for:", userQuestion);
      return "Sorry, I couldn’t find any information related to your question.";
    }
  } catch (error: any) {
    console.error("❌ Error fetching knowledge:", error);
    return "Sorry, something went wrong while fetching the answer.";
  }
}
