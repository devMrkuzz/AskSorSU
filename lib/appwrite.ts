import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your region endpoint
  .setProject("YOUR_PROJECT_ID"); // Replace with your actual Appwrite Project ID

export const account = new Account(client);
