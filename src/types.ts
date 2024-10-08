export enum Days {
    Monday = 'Monday',
    Tuesday = 'Tuesday',
    Wednesday = 'Wednesday',
    Thursday = 'Thursday',
    Friday = 'Friday',
    Saturday = 'Saturday',
    Sunday = 'Sunday'
}

export interface Exercise {
    id: string;
    name: string;
    sets?: string;
    reps?: string;
    duration?: string;
    description?: string;
    weight?: string;
}

export interface Workout {
    id: string;
    title: string;
    day: Days;
    exercises: Exercise[];
}

export type NewExercise = Omit<Exercise, 'id'>;
// export type NewWorkout = Omit<Workout, 'id'>;

export type NewWorkout = {
    title: string;
    day: Days;
    exercises: NewExercise[];
}