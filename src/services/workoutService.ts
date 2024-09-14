import { Workout } from '../models/workout';
import { WorkoutEntry, ExerciseEntry } from '../types';
import { toWorkoutEntry } from '../utils';

const getEntries = async (): Promise<WorkoutEntry[]> => {
    return await Workout.find({});
};

const findById = async (id: string): Promise<WorkoutEntry> => {
    const workout = await Workout.findById(id);
    if (!workout) {
        throw new Error(`Could not find workout with id ${id}`);
    }
    return toWorkoutEntry(workout);
};

const addWorkout = async (newWorkout: WorkoutEntry): Promise<WorkoutEntry> => {
    const workout = new Workout({
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    });
    const savedWorkout = await workout.save();
    return savedWorkout.toJSON() as WorkoutEntry;
};

const addExercise = async (workoutId: string, exercise: ExerciseEntry): Promise<WorkoutEntry> => {
    const updatedWorkout = await Workout.findById(workoutId);
    if (!updatedWorkout) {
        throw new Error(`Could find a workout with the id ${workoutId}`);
    }
    updatedWorkout.exercises.push(exercise);
    const newWorkout = await Workout.findByIdAndUpdate(workoutId, updatedWorkout, { new: true });
    return toWorkoutEntry(newWorkout);
};

export default {
    getEntries,
    findById,
    addWorkout,
    addExercise
};
