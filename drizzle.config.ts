    import "dotenv/config";
    import { defineConfig } from "drizzle-kit";

    export default defineConfig({
      out: "./drizzle", // Output directory for migrations
      schema: "./src/db/schema.ts", // Path to your schema file
      dialect: "postgresql",
      dbCredentials: {
        url: process.env.DATABASE_URL!,
      },
    });