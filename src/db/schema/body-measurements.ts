import {
  date,
  numeric,
  pgTable,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

import { users } from "./users";

export const bodyMeasurements = pgTable(
  "body_measurements",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    date: date("date", { mode: "date" }).notNull(),
    neck: numeric("neck", { precision: 5, scale: 2, mode: "number" }),
    shoulders: numeric("shoulders", { precision: 5, scale: 2, mode: "number" }),
    chest: numeric("chest", { precision: 5, scale: 2, mode: "number" }),
    waist: numeric("waist", {
      precision: 5,
      scale: 2,
      mode: "number",
    }).notNull(),
    hips: numeric("hips", { precision: 5, scale: 2, mode: "number" }),
    biceps: numeric("biceps", { precision: 5, scale: 2, mode: "number" }),
    thigh: numeric("thigh", { precision: 5, scale: 2, mode: "number" }),
    calf: numeric("calf", { precision: 5, scale: 2, mode: "number" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("body_measurements_userId_date_idx").on(
      table.userId,
      table.date,
    ),
  ],
);
