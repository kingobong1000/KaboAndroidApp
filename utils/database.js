import * as SQLite from "expo-sqlite";

export async function openDB() {
  return await SQLite.openDatabaseAsync("app.db");
}



// Functions to drop tables
// =======================
export async function dropThemeTable() {
  const db = await openDB();

  await db.execAsync(`
    DROP TABLE IF EXISTS theme;
  `);

  console.log("Theme table dropped");
}


 
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



//  Function to recreate the table
export async function createThemeTable() {
  const db = await openDB();

  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS theme (
      id INTEGER PRIMARY KEY,
      name TEXT
    );
  `);

  console.log("Theme table created");
}


// Function to inspect tables 
export async function showTables() {
  const db = await openDB();

  const tables = await db.getAllAsync(
    "SELECT name FROM sqlite_master WHERE type='table'"
  );

  console.log("DATABASE TABLES:", tables);
  return tables;
}



// Function to inspect table columns 
// ==================================
export async function showColumns(table) {
  const db = await openDB();
  const cols = await db.getAllAsync(
    `PRAGMA table_info(${table})`
  );

  console.log(`Columns in ${table}:`, cols);
  return cols;
}




// Function to show rows
// ==================================
export async function showRows(table) {
  const db = await openDB();

  const rows = await db.getAllAsync(
    `SELECT * FROM ${table}`
  );

  console.log(`Rows in ${table}:`, rows);
  return rows;
}



export function initApp(){
  console.log('Setting up the databse')
}