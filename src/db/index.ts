import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import { env } from "@/env";

import { relations } from "./relations";

export const db = drizzle({
  client: neon(env.DATABASE_URL),
  relations: relations,
});
