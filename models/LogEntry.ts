export default class LogEntry {
    private _id: string;
    private _date: Date;
    private _exercise: string;
    private _sets: number;
    private _reps: number;
    private _weight?: number;

    constructor(id: string, date: Date, exercise: string, sets: number, reps: number, weight?: number) {
        this._id = id;
        this._date = date;
        this._exercise = exercise;
        this._sets = sets;
        this._reps = reps;
        this._weight = weight;
    }

    get id(): string {
        return this._id;
    }

    get date(): Date {  
        return this._date;
    }

    get exercise(): string {
        return this._exercise;
    }

    set exercise(exercise: string) {
        this._exercise = exercise;
    }

    get sets(): number {
        return this._sets;
    }

    set sets(sets: number) {
        this._sets = sets;
    }

    get reps(): number {
        return this._reps;
    }   

    set reps(reps: number) {
        this._reps = reps;
    }

    get weight(): number | undefined {
        return this._weight;
    }

    set weight(weight: number | undefined) {
        this._weight = weight;
    }
}