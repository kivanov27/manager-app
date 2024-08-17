import workouts from '../../data/workouts';

import { WorkoutEntry } from '../types';

const getEntries = (): WorkoutEntry[] => {
    return workouts;
};

const addWorkout = () => {
    return null;
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
