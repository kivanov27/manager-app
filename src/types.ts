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

export type NewExercise = Omit<Exercise, 'id'>;

export interface Workout {
    id: string;
    title: string;
    day: Days;
    exercises: Exercise[];
}

export type NewWorkout = {
    title: string;
    day: Days;
    exercises: NewExercise[];
};

export interface WorkoutRecord extends Workout {
    date: string;
}

export interface NewWorkoutRecord extends NewWorkout {
    date: string;
}
