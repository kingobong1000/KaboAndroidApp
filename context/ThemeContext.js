import React, { createContext, useContext, useState, useEffect } from "react";
import * as SQLite from "expo-sqlite";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {

const [theme, setTheme] = useState("light");

// Setting up the theme dabase
useEffect(() => {
  async function loadTheme() {
    try {
      const db = await SQLite.openDatabaseAsync("app.db");

      // 1. Ensure table exists (correct structure)
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS theme (
          id INTEGER PRIMARY KEY NOT NULL,
          theme TEXT
        );
      `);

      // 2. Check if default row exists (id = 1)
      const result = await db.getFirstAsync(
        "SELECT theme FROM theme WHERE id = 1"
      );

      // 3. If not exists → insert default
      if (!result) {
        await db.runAsync(
          "INSERT INTO theme (id, theme) VALUES (?, ?)",
          [1, "light"]
        );

        setTheme("light");
      } else {
        // 4. Use stored value
        setTheme(result.theme);
      }

    } catch (err) {
      console.log("Theme load error:", err);
    }
  }
  loadTheme();
}, []);


  // Function to update theme both in state & SQLite
  async function updateTheme(newTheme) {
    try {
      const db = await SQLite.openDatabaseAsync("app.db");
      await db.runAsync(
        "UPDATE theme SET theme=? WHERE id=1",
        [newTheme]
      );
      setTheme(newTheme);
    } catch (err) {
      console.log("Theme update error:", err);
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Hook to use theme easily
export function useTheme() {
  return useContext(ThemeContext);
}