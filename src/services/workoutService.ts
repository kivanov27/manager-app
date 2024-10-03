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
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Could not find a workout with the id ${workoutId}`);
    }
    workout.exercises.push(exercise);

    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, workout, { new: true });
    return toWorkoutEntry(updatedWorkout);
};

const updateWorkout = async (workoutId: string, newWorkout: WorkoutEntry): Promise<WorkoutEntry> => {
    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, {
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    }, { new: true });

    if (!updatedWorkout) {
        throw new Error(`Workout with id ${workoutId} could not be found and updated`);
    }

    return updatedWorkout.toJSON() as WorkoutEntry;
};

const deleteWorkout = async (workoutId: string): Promise<void | null> => {
    return await Workout.findByIdAndDelete(workoutId);
};

const deleteExercise = async (workoutId: string, exerciseId: string): Promise<WorkoutEntry> => {
   const workout = await Workout.findById(workoutId);
   if (!workout) {
       throw new Error(`Could not find a workout with the id ${workoutId}`);
   }
   workout.exercises = workout.exercises.filter(exercise => exercise._id?.toString() !== exerciseId);
   const updatedWorkout = await workout.save();
   return toWorkoutEntry(updatedWorkout);
};

export default {
    getEntries,
    findById,
    addWorkout,
    addExercise,
    updateWorkout,
    deleteWorkout,
    deleteExercise
};
