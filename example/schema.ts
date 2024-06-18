//mysql

import { date, int, json, mysqlTable } from "drizzle-orm/mysql-core";
export const mysqlSessionTable = mysqlTable('sessions', {
  sid: int('sid'),
  session: json("session"),
  expires: date("date")
});

//sqlite

import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
export const sqliteSessionTable = sqliteTable('sessions', {
  sid: integer('sid'),
  session: text("session", { mode: "json" }),
  expres: text("date")
});
