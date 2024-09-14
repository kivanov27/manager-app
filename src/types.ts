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
    name: string;
    sets?: string;
    reps?: string;
    duration?: string;
    description?: string;
    weight?: string;
}

export interface WorkoutEntry {
    title: string;
    day: Days;
    exercises: ExerciseEntry[];
}

//export type NewWorkoutEntry = Omit<WorkoutEntry, 'id'>;
