import { WorkoutEntry, NewWorkoutEntry } from '../types';
import { Workout } from '../models/workout';

const getEntries = async (): Promise<WorkoutEntry[]> => {
    return await Workout.find({});
};

const addWorkout = async (newWorkout: NewWorkoutEntry): Promise<WorkoutEntry> => {
    const workout = new Workout({
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    });

    const savedWorkout = await workout.save();
    return savedWorkout.toJSON() as WorkoutEntry;
};

// const findById = (id: number): WorkoutEntry | undefined => {
//    const workout = workouts.find(wo => wo.id === id);
//    return workout;
// };

export default {
    getEntries,
    addWorkout,
//    findById
};
