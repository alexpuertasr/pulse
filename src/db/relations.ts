import { defineRelations } from "drizzle-orm";

import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  users: {
    sessions: r.many.sessions(),
    accounts: r.many.accounts(),
    bodyMeasurements: r.many.bodyMeasurements(),
    bodyWeights: r.many.bodyWeights(),
  },
  sessions: {
    user: r.one.users({ from: r.sessions.userId, to: r.users.id }),
  },
  accounts: {
    user: r.one.users({ from: r.accounts.userId, to: r.users.id }),
  },
  bodyMeasurements: {
    user: r.one.users({ from: r.bodyMeasurements.userId, to: r.users.id }),
  },
  bodyWeights: {
    user: r.one.users({ from: r.bodyWeights.userId, to: r.users.id }),
  },
}));
