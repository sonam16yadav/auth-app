

import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import "dotenv/config";

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,           
  idleTimeoutMillis: 30000, // close idle clients after 30s

   ssl: false,
});

// Use drizzle with the pool
export const db = drizzle(pool);

// Optional: test connection
export async function testConnection() {
  try {
    const client = await pool.connect(); // get a client from the pool
    await client.query("SELECT 1");       // simple test query
    console.log(" Database connected successfully!");
    client.release();                     // release the client back to the pool
  } catch (err) {
    console.error(" Database connection failed:", err);
  }
}













































// import { drizzle } from "drizzle-orm/node-postgres";
    // import { Pool } from "pg";
    // import "dotenv/config"; // Load environment variables

    // const pool = new Pool({
    //   connectionString: process.env.DATABASE_URL,
    //   ssl: process.env.NODE_ENV === "production", // Enable SSL in production
    // });

    // export const db = drizzle(pool);


//     import { drizzle } from 'drizzle-orm/node-postgres';
// import { Client } from 'pg';
// import 'dotenv/config';

// const client = new Client({
//   connectionString: process.env.DATABASE_URL,
// });

// export const db = drizzle(client);

// export async function testConnection() {
//   try {
//     await client.connect();
//     console.log('✅ Database connected successfully!');
//   } catch (err) {
//     console.error('❌ Database connection failed:', err);
//   } finally {
//     await client.end();
//   }
// }
