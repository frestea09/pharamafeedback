
export type LogEntry = {
    timestamp: Date;
    message: string;
};

// In-memory array to store logs for the demo.
// In a real application, this would write to a database, a file, or a logging service.
export const systemLogs: LogEntry[] = [];

const MAX_LOGS = 100;

/**
 * Adds a new log entry to the in-memory log array.
 * @param message The message to be logged.
 */
export function logActivity(message: string) {
    const newEntry: LogEntry = {
        timestamp: new Date(),
        message: message,
    };

    // Add new log to the beginning of the array
    systemLogs.unshift(newEntry);

    // Keep the log array at a manageable size
    if (systemLogs.length > MAX_LOGS) {
        systemLogs.pop();
    }
    
    // In a real app, you might revalidate a path if logs were displayed in real-time,
    // but for this demo, we'll rely on page reloads.
    // console.log(`[LOG] ${newEntry.timestamp.toISOString()}: ${newEntry.message}`);
}

/**
 * Retrieves all log entries.
 * @returns An array of all log entries.
 */
export async function getSystemLogs(): Promise<LogEntry[]> {
    // This is an async function to mimic a database call.
    return Promise.resolve(systemLogs);
}
