import { json, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';

export const sessionTable = pgTable('sessions', {
  sid: varchar('sid'),
  session: json('session'),
  expires: timestamp('date'),
});
