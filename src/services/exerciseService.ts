import exercises from '../../data/exercises';

import { ExerciseEntry, NewExerciseEntry } from '../types';

const getEntries = (): ExerciseEntry[] => {
    return exercises;
};

const addExercise = (exercise: NewExerciseEntry): ExerciseEntry => {
    const newExercise = {
        id: Math.max(...exercises.map(e => e.id)) + 1,
        ...exercise
    };

    exercises.push(newExercise);
    return newExercise;
};

const findById = (id: number): ExerciseEntry | undefined => {
    const exercise = exercises.find(e => e.id === id);
    return exercise;
};

export default {
    getEntries,
    addExercise,
    findById
};
