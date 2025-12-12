import { Client, Account } from "appwrite";

const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // Your region endpoint
  .setProject("693b5308001cb1d4f1f7"); // Replace with your actual Appwrite Project ID

export const account = new Account(client);
