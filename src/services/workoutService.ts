import workouts from '../../data/workouts';

import { WorkoutEntry } from '../types';

const getEntries = (): WorkoutEntry[] => {
    return workouts;
};

const addWorkout = () => {
    return null;
};

export default {
    getEntries,
    addWorkout
};
