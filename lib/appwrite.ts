import "server-only";
import { Client, Databases, Query, type Models } from "node-appwrite";

const BOOKS_COLLECTION = "books";
const JUNKYARD_PIRATE_SERIES_ID = "6a504cfb00223d37fdf3";

export interface BookDoc extends Models.Document {
  series_number: number;
  title: string;
  tagline?: string;
  blurb?: string;
  cover_url?: string;
  cover_alt?: string;
  store_url: string;
  store_label?: string;
  audible_url?: string;
}

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

let databases: Databases | null = null;

function getDatabases(): Databases {
  if (!databases) {
    const client = new Client()
      .setEndpoint(requiredEnv("CMS_ENDPOINT"))
      .setProject(requiredEnv("CMS_PROJECT_ID"))
      .setKey(requiredEnv("CMS_API_KEY"));
    databases = new Databases(client);
  }
  return databases;
}

function databaseId(): string {
  return requiredEnv("CMS_DATABASE_ID");
}

export async function getBooks(): Promise<BookDoc[]> {
  const res = await getDatabases().listDocuments<BookDoc>(databaseId(), BOOKS_COLLECTION, [
    Query.equal("series_id", JUNKYARD_PIRATE_SERIES_ID),
    Query.orderAsc("series_number"),
  ]);
  return res.documents;
}
