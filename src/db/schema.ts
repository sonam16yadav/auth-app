import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

// USERS TABLE
export const users = pgTable("users", {
  id: serial("id").primaryKey(),

  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  gender: varchar("gender", { length: 10 }).notNull(),

  email: varchar("email", { length: 255 }).notNull().unique(),
  password: text("password").notNull(),


  createdAt: timestamp("created_at").defaultNow().notNull(),

});
