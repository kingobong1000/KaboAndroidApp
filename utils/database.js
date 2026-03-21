import * as SQLite from "expo-sqlite";

export async function openDB() {
  return await SQLite.openDatabaseAsync("app.db");
}

// -------------------------------

// [1]
// Function to inspect tables 
export async function showTables() {
  const db = await openDB();

  const tables = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table'"
  );

  console.log("DATABASE TABLES:", tables);
  return tables;
}


// -------------------------------------

// [2]
// Function to inspect table columns 
// ==================================
export async function showColumns(table) {
  const db = await openDB();
   // ✅ SANITIZE HERE
  const safeTable = table.replace(/[^a-zA-Z0-9_]/g, "");
  const cols = await db.getAllAsync(
    `PRAGMA table_info(${safeTable})`
  );

  console.log(`Columns in ${table}:`, cols);
   return cols.map(col => ({
    name: col.name
  }));
}

// -------------------------------------

// [3]
// Functions to drop the theme table [USED]
// =======================
export async function dropThemeTable() {
  const db = await openDB();

  await db.execAsync(`
    DROP TABLE IF EXISTS theme;
  `);

  console.log("Theme table dropped");
  return "Theme table dropped";
}

// -------------------------------------
 
// [4]
//  Function to recreate the table
export async function createNewTable(table) {
  if (!table) throw new Error("Table name is required");
    const safeTable = table.replace(/[^a-zA-Z0-9_]/g, "");
    const db = await openDB();
  

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS ${safeTable} (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log(`Table "${safeTable}" created`);

  return [{ name: "id" }, { name: "name" }, { name: "created_at" }];
}


// ----------------------


export async function deleteTable(table) {
  if (!table) throw new Error("Table name is required");
  const safeTable = table.replace(/[^a-zA-Z0-9_]/g, "");
  const db = await openDB();
  await db.execAsync(`DROP TABLE IF EXISTS ${safeTable};`);
  console.log(`Table "${safeTable}" deleted`);

  return [{ name: "Table deleted" }];
}


// --------------------------------------------
// format the table
export async function truncateTable(table) {
  if (!table) throw new Error("Table name is required");
  const safeTable = table.replace(/[^a-zA-Z0-9_]/g, "");
  const db = await openDB();
  await db.execAsync(`DELETE FROM ${safeTable};`);
  console.log(`Table "${safeTable}" truncated`);

  return [{ name: "All rows deleted" }];
}



// --------------------------------------------

// Show the structure of the table
export async function showTableStructure(table) {
  if (!table) throw new Error("Table name is required");
  const safeTable = table.replace(/[^a-zA-Z0-9_]/g, "");
  const db = await openDB();

  const cols = await db.getAllAsync(
    `PRAGMA table_info(${safeTable});`
  );

  console.log(`Structure of ${safeTable}:`, cols);

  return cols.map(col => ({
    name: `${col.name} (${col.type})`
  }));
}

// ------------------------


// Function to show rows
// ==================================
export async function showRows(table) {
  const db = await openDB();
  const safeTable = table.replace(/[^a-zA-Z0-9_]/g, "");
  const rows = await db.getAllAsync(
    `SELECT * FROM ${safeTable}`
  );

  console.log(`Rows in ${safeTable}:`, rows);
  return rows;
}

// ------------------------


// Delte all tables
export async function dropAllTables() {
  const db = await openDB();

  const tables = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';"
  );

  for (const table of tables) {
    await db.execAsync(`DROP TABLE IF EXISTS ${table.name}`);
  }
  console.log("TABLES Deleted:");
  return "All tables deleted";
}




export function initApp(){
  console.log('Setting up the databse')
}