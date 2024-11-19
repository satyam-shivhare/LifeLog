import * as SQLite from 'expo-sqlite';

export const migrateIfNeeded = async (db: SQLite.SQLiteDatabase): Promise<void> => {
  const createExerciseTable: string = `
    CREATE TABLE IF NOT EXISTS Exercises (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );
  `;

  const createLogTable: string = `
    CREATE TABLE IF NOT EXISTS Logs (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      date DATETIME NOT NULL
    );
  `;

  const createLogEntryTable: string = `
    CREATE TABLE IF NOT EXISTS LogEntries (
      id TEXT PRIMARY KEY,
      log_id TEXT NOT NULL,
      exercise_id TEXT NOT NULL,
      date DATETIME NOT NULL,
      sets INTEGER NOT NULL CHECK (sets > 0),
      reps INTEGER NOT NULL CHECK (reps > 0),
      weight INTEGER DEFAULT 0,
      FOREIGN KEY (log_id) REFERENCES Logs(id),
      FOREIGN KEY (exercise_id) REFERENCES Exercises(id)
    );
  `;

   await db.execAsync(`${createExerciseTable} ${createLogTable} ${createLogEntryTable}`);
};