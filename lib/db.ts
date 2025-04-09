import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

// Create a SQL client with the database URL from environment variables
export const sql = neon("postgresql://neondb_owner:npg_l7EHvhkiIQy4@ep-lively-field-a5lufbmy-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require")

// Create a drizzle client to use with the SQL client
export const db = drizzle(sql)

// Helper function to execute SQL queries
// lib/db.ts
export async function executeQuery(query: string, params: any[] = []) {
  try {
    return await sql.query(query, params); // ✅ correct function
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

