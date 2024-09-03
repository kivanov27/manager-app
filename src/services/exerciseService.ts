import { Exercise } from '../models/exercise';

import { ExerciseEntry, NewExerciseEntry } from '../types';

const getEntries = async (): Promise<ExerciseEntry[]> => {
    //return exercises;
    return await Exercise.find({});
};

const addExercise = async (newExercise: NewExerciseEntry): Promise<ExerciseEntry> => {
    const exercise = new Exercise({
        name: newExercise.name,
        reps: newExercise.reps,
        sets: newExercise.sets,
        duration: newExercise.duration,
        weight: newExercise.weight,
    }); 

    const savedExercise = await exercise.save();
    return savedExercise.toJSON() as ExerciseEntry;
};

//const findById = (id: number): ExerciseEntry | undefined => {
//    const exercise = exercises.find(e => e.id === id);
//    return exercise;
//};

export default {
    getEntries,
    addExercise,
    //findById
};
