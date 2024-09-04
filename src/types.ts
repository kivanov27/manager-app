export interface ExerciseEntry {
    id: number;
    name: string;
    sets?: number;
    reps?: number;
    duration?: string;
    description?: string;
    weight?: string;
}

export type NewExerciseEntry = Omit<ExerciseEntry, 'id'>;

export interface WorkoutEntry {
    id: number;
    title: string;
    day: string;
    exercises: NewExerciseEntry[];
}

export type NewWorkoutEntry = Omit<WorkoutEntry, 'id'>;

export enum Example {
    option1 = 'asdasd',
    option2 = 'asnsrngsrg',
    option3 = 'aiusfbj',
}
