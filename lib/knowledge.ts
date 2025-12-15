"use server";

import { Databases, Query } from "appwrite";
import client from "@/lib/appwrite";

// Initialize database instance
const databases = new Databases(client);

export async function findKnowledge(userQuestion: string) {
  try {
    // Normalize the question to lowercase for flexible matching
    const keywords = userQuestion.toLowerCase().split(/\s+/);

    // Build multiple keyword queries
    const queries = keywords.map((word) => Query.search("keywords", word));

    // Query your Appwrite knowledge table
    const response = await databases.listDocuments(
      process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
      process.env.NEXT_PUBLIC_APPWRITE_KNOWLEDGE_COLLECTION_ID!,
      queries
    );

    // If results found, return the best match
    if (response.documents.length > 0) {
      return response.documents[0].answer;
    }

    // No matching knowledge found
    return "Sorry, I couldn't find any information related to your question.";
  } catch (error: any) {
    console.error("Error fetching knowledge:", error.message);
    return "There was a problem accessing the knowledge base.";
  }
}
