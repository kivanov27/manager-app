import workouts from '../../data/workouts';

import { WorkoutEntry, NewWorkoutEntry } from '../types';

const getEntries = (): WorkoutEntry[] => {
    return workouts;
};

const addWorkout = (workout: NewWorkoutEntry): WorkoutEntry => {
    const newWorkout = {
        id: Math.max(...workouts.map(w => w.id)) + 1,
        ...workout
    };

    workouts.push(newWorkout);
    return newWorkout;
};

const findById = (id: number): WorkoutEntry | undefined => {
    const workout = workouts.find(wo => wo.id === id);
    return workout;
};

export default {
    getEntries,
    addWorkout,
    findById
};
