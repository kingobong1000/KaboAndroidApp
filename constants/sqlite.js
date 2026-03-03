import * as SQLite from "expo-sqlite";

const DB_NAME = "kabo.db";
let dbPromise = null;




function makeId(prefix = "id_") {
  return `${prefix}${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}



async function getDb() {
  if (!dbPromise) dbPromise = SQLite.openDatabaseAsync(DB_NAME);
  return dbPromise;
}

export async function initDb() {
  const db = await getDb();

  // Safe because it's hard-coded schema (no user input).
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY NOT NULL,
      server_id TEXT,
      name TEXT,
      phone TEXT,
      email TEXT,
      lat REAL,
      lng REAL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS user_locations (
      id TEXT PRIMARY KEY NOT NULL,
      user_id TEXT NOT NULL,
      lat REAL NOT NULL,
      lng REAL NOT NULL,
      accuracy REAL,
      source TEXT,
      created_at INTEGER NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_user_locations_user_id_created_at
      ON user_locations(user_id, created_at DESC);
  `);
}

export async function upsertUser(user) {
  const db = await getDb();
  const now = Date.now();

  await db.runAsync(
    `
    INSERT INTO users (id, server_id, name, phone, email, lat, lng, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(id) DO UPDATE SET
      server_id = excluded.server_id,
      name      = excluded.name,
      phone     = excluded.phone,
      email     = excluded.email,
      lat       = excluded.lat,
      lng       = excluded.lng,
      updated_at= excluded.updated_at
    `,
    user.id,
    user.serverId ?? null,
    user.name ?? null,
    user.phone ?? null,
    user.email ?? null,
    user.lat ?? null,
    user.lng ?? null,
    now
  );
}

export async function saveUserLocation({ userId, lat, lng, accuracy = null, source = "map_center" }) {
  const db = await getDb();
  const now = Date.now();
  const locationId = makeId("loc_");

  // Transaction: location history + update user's latest lat/lng together
  await db.withTransactionAsync(async () => {
    await db.runAsync(
      `
      INSERT INTO user_locations (id, user_id, lat, lng, accuracy, source, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      locationId,
      userId,
      lat,
      lng,
      accuracy,
      source,
      now
    );

    await db.runAsync(
      `
      UPDATE users
      SET lat = ?, lng = ?, updated_at = ?
      WHERE id = ?
      `,
      lat,
      lng,
      now,
      userId
    );
  });

  return locationId;
}

export async function getUser(userId) {
  const db = await getDb();
  return db.getFirstAsync("SELECT * FROM users WHERE id = ?", userId);
}

export async function getLatestUserLocation(userId) {
  const db = await getDb();
  return db.getFirstAsync(
    `
    SELECT *
    FROM user_locations
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
    `,
    userId
  );
}