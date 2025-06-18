import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const sqliteSessionTable = sqliteTable('sessions', {
  sid: integer('sid'),
  session: text('session', { mode: 'json' }),
  expires: text('date'),
});
