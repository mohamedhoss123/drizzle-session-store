# 🍃 Drizzle + Express Session Integration

This library integrates **Drizzle ORM** with **Express sessions**

## 🚀 Features

* Express session storage backed by SQLite (via Drizzle ORM).
* Type-safe schema using `drizzle-orm`.
* Easy integration into any Express app.

---

## 📦 Installation

Make sure you have the following packages installed:

Note: you can use any database not just sqlite
```bash
npm install drizzle-orm @libsql/client express-session drizzle-session-store dotenv
```

---

## 📁 Folder Structure



## 🧱 Schema Example (`src/schema.ts`)

```ts
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const sqliteSessionTable = sqliteTable('sessions', {
  sid: integer('sid'),
  session: text('session', { mode: 'json' }),
  expires: text('date'),
});

```
See examples for other databases [Here!](https://github.com/mohamedhoss123/drizzle-session-store/tree/main/example)
---

## 🛠 Usage Example

```ts
import express from "express";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./src/schema";
import { createClient } from "@libsql/client";
import session from "express-session";
import { DrizzleSessionStore } from "drizzle-session-store";
import 'dotenv/config';

const client = createClient({
  url: process.env.DB_FILE_NAME!,
});

const db = drizzle({ client, schema });

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  store: new DrizzleSessionStore(db, schema.sqliteSessionTable),
  // cookie: { secure: true } // Optional: enable for HTTPS
}));

app.get("/", (req, res) => {
  req.session.user = "Mohamed";
  res.send("Session set!");
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

