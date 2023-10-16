import { relations, sql } from "drizzle-orm";
import {
  integer,
  primaryKey,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

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

export const tasksRelation = relations(tasks, ({ one, many }) => ({
  createdBy: one(users, {
    fields: [tasks.createdById],
    references: [users.id],
  }),
  tasksToTags: many(tasksToTags),
}));

//TODO: tags go on the modal, need that to continue
export const tags = sqliteTable("tags", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
});

export const tagRelations = relations(tags, ({ many }) => ({
  tasksToTags: many(tasksToTags),
}));

export const tasksToTags = sqliteTable(
  "tasks_to_tags",
  {
    taskId: text("task_id")
      .notNull()
      .references(() => tasks.id),
    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id),
  },
  (t) => ({
    pk: primaryKey(t.taskId, t.tagId),
  })
);

export const tasksToTagsRelations = relations(tasksToTags, ({ one }) => ({
  task: one(tasks, {
    fields: [tasksToTags.taskId],
    references: [tasks.id],
  }),
  tags: one(tags, {
    fields: [tasksToTags.tagId],
    references: [tags.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type TaskSelect = typeof tasks.$inferSelect;
