import Exercise from '@/models/Exercises';
import Log from '@/models/Log';
import LogEntry from '@/models/LogEntry';
import * as SQLite from 'expo-sqlite';

export const GetAllExercises = async (db: SQLite.SQLiteDatabase): Promise<Exercise[]> => {
    const query = 'SELECT * FROM Exercises';
    const result = await db.getAllAsync(query);
    return result.map((row: any) => new Exercise(row.id, row.name));
};

export const GetAllLogs = async (db: SQLite.SQLiteDatabase): Promise<Log[]> => {
    const query = 'SELECT * FROM Logs';
    const result = await db.getAllAsync(query);
    return result.map((row: any) => new Log(row.id, row.name, row.date));
};

export const GetAllLogEntriesByLogId = async (db: SQLite.SQLiteDatabase, logId: string): Promise<LogEntry[]> => {
    const query = 'SELECT * FROM LogEntries WHERE logId = ?';
    const result = await db.getAllAsync(query, [logId]);
    return result.map((row: any) => new LogEntry(row.id, row.date, row.exercise, row.sets, row.reps, row.weight));
};

// export const GetAllLogsWithLogEntries = async (db: SQLite.SQLiteDatabase): Promise<Log> => {
//     const query = 'SELECT * FROM Logs INNER JOIN LogEntries ON Logs.id == LogEntries.logId';
//     const result = await db.getAllAsync(query);
//     return result.map((row: any) => new Log(row.id, ));
//     )
// }

export const InsertExercise = async (db: SQLite.SQLiteDatabase, exercise: Exercise): Promise<SQLite.SQLiteRunResult> => {
    const query = 'INSERT INTO Exercises (id, name) VALUES (?, ?)';
    return await db.runAsync(query, [exercise.id, exercise.name]);
};

export const InsertLog = async (db: SQLite.SQLiteDatabase, log: Log): Promise<SQLite.SQLiteRunResult> => {
    const query = 'INSERT INTO Logs (id, name, date) VALUES (?, ?, ?)';
    return await db.runAsync(query, [log.id, log.name, log.date.toISOString()]);
};

export const InsertLogEntry = async (db: SQLite.SQLiteDatabase, logEntry: LogEntry): Promise<SQLite.SQLiteRunResult> => {
    const query = 'INSERT INTO LogEntries (id, logId, date, exercise, sets, reps, weight) VALUES (?, ?, ?, ?, ?, ?, ?)';
    return await db.runAsync(query, [logEntry.id, logEntry.id, logEntry.date.toISOString(), logEntry.exercise, logEntry.sets, logEntry.reps, logEntry.weight ?? null]);
};

export const UpdateLogEntry = async (db: SQLite.SQLiteDatabase, logEntry: LogEntry): Promise<SQLite.SQLiteRunResult> => {
    const query = 'UPDATE LogEntries SET date = ?, exercise = ?, sets = ?, reps = ?, weight = ? WHERE id = ?';
    return await db.runAsync(query, [logEntry.date.toISOString(), logEntry.exercise, logEntry.sets, logEntry.reps, logEntry.weight ?? null, logEntry.id]);
};

export const DeleteLogEntry = async (db: SQLite.SQLiteDatabase, logEntry: LogEntry): Promise<SQLite.SQLiteRunResult> => {
    const query = 'DELETE FROM LogEntries WHERE id = ?';
    return await db.runAsync(query, [logEntry.id]);
};

export const DeleteLog = async (db: SQLite.SQLiteDatabase, log: Log): Promise<SQLite.SQLiteRunResult> => {
    const query = 'DELETE FROM Logs WHERE id = ?';
    return await db.runAsync(query, [log.id]);
};

export const DeleteExercise = async (db: SQLite.SQLiteDatabase, exercise: Exercise): Promise<SQLite.SQLiteRunResult> => {
    const query = 'DELETE FROM Exercises WHERE id = ?';
    return await db.runAsync(query, [exercise.id]);
};