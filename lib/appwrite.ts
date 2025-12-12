import { Client, Account } from "appwrite";

const client = new Client();

client
  .setEndpoint("https://fra.cloud.appwrite.io/v1") // your endpoint
  .setProject("693b5308001cb1d4f1f7"); // your project ID

export const account = new Account(client);
export default client;
