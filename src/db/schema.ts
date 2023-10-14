import { relations, sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  clerkId: text("clerk_id").notNull(),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
});

export const usersRelations = relations(users, ({ many }) => ({
  tasks: many(tasks),
}));

export const tasks = sqliteTable("tasks", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  status: text("status").notNull(),
  createdById: text("created_by_id").notNull(),
  initial: integer("initial", { mode: "boolean" }).notNull(),
  description: text("description"),
  createdAt: text("created_at").default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at").default(sql`CURRENT_TIMESTAMP`),
});

export const tasksRelation = relations(tasks, ({ one }) => ({
  createdBy: one(users, {
    fields: [tasks.createdById],
    references: [users.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type TaskSelect = typeof tasks.$inferSelect;
