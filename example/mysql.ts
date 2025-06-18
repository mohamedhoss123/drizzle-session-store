import { date, int, json, mysqlTable } from 'drizzle-orm/mysql-core';

export const mysqlSessionTable = mysqlTable('sessions', {
  sid: int('sid'),
  session: json('session'),
  expires: date('date'),
});
