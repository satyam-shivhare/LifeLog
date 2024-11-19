import LogEntry from "./LogEntry";

export default class Log {
    private _id: string;
    private _name: string;
    private _date: Date;
    private _entries: LogEntry[];

    constructor(id: string, name: string, date: Date = new Date(), entries: LogEntry[] = []) {
        this._id = id;
        this._name = name;
        this._date = date;
        this._entries = entries;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get date(): Date {
        return this._date;
    }
   
    get entries(): LogEntry[] {
        return this._entries;
    }

    set entries(entries: LogEntry[]) {
        this._entries = entries;
    }

    public AddEntry(entry: LogEntry): void {
        this.entries.push(entry);
    }

    public RemoveEntry(entry: LogEntry): void {
        this.entries = this.entries.filter(e => e.id !== entry.id);
    }

    public EditEntry(entry: LogEntry): boolean {
        let logEntry: LogEntry | undefined = this.entries.find(e => e.id === entry.id);
        if (logEntry) {
            logEntry = entry;
            return true;
        }
        return false;
    }
}   