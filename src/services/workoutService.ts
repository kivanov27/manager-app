import { Workout } from '../models/workout';
import { WorkoutEntry, ExerciseEntry, NewWorkoutEntry } from '../types';
import { toWorkoutEntry } from '../utils';

const getEntries = async (): Promise<WorkoutEntry[]> => {
    return await Workout.find({});
};

const findById = async (id: number): Promise<WorkoutEntry> => {
    const workout = await Workout.find({ id: id });

    if (!workout) {
        throw new Error(`Could not find workout with id ${id}`);
    }

    return toWorkoutEntry(workout);
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

const addExercise = async (workoutId: string, exercise: ExerciseEntry): Promise<WorkoutEntry> => {
    const workout = await Workout.findById(workoutId);

    if (!workout) {
        throw new Error(`No workout found with the id ${workoutId}`);
    }

    workout.exercises.push(exercise);
    await workout.save();

    return toWorkoutEntry(workout);
};

export default {
    getEntries,
    findById,
    addWorkout,
    addExercise
};
