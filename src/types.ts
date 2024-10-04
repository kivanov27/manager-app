import { Types } from "mongoose";

export enum Days {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday'
}

export interface ExerciseEntry {
    // _id?: Types.ObjectId;
    id: string;
    name: string;
    sets?: string;
    reps?: string;
    duration?: string;
    description?: string;
    weight?: string;
}

export interface WorkoutEntry {
    id: string;
    title: string;
    day: Days;
    exercises: (Types.ObjectId | ExerciseEntry)[];
}

export type NewExerciseEntry = Omit<ExerciseEntry, 'id'>;
export type NewWorkoutEntry = Omit<WorkoutEntry, 'id'>;
