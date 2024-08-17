export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy';

export interface ExerciseEntry {
    id: number;
    name: string;
    sets?: number;
    reps?: number;
    duration?: string;
    description?: string;
    weight?: string;
}

export interface WorkoutEntry {
    id: number;
    title: string;
    date?: string;
    exercises: ExerciseEntry[];
}
