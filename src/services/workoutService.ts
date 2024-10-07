import mongoose from 'mongoose';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';
import { Workout as WorkoutEntry, NewWorkout, NewExercise } from '../types';

const getAllWorkouts = async (): Promise<WorkoutEntry[]> => {
    return await Workout.find({});
};

const getWorkout = async (id: string): Promise<WorkoutEntry> => {
    const workout = await Workout.findById(id);
    if (!workout) {
        throw new Error(`Could not find workout with id ${id}`);
    }
    return workout.toJSON() as WorkoutEntry;
};

const createWorkout = async (newWorkout: NewWorkout): Promise<WorkoutEntry> => {
    const workout = new Workout({
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    });
    const savedWorkout = await workout.save();
    return savedWorkout.toJSON() as WorkoutEntry;
};

const updateWorkout = async (workoutId: string, newWorkout: NewWorkout): Promise<WorkoutEntry> => {
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

const addExerciseToWorkout = async (workoutId: string, newExercise: NewExercise): Promise<WorkoutEntry> => {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Could not find a workout with the id ${workoutId}`);
    }

    const exercise = new Exercise(newExercise);

    try {
        const savedExercise = await exercise.save();
        workout.exercises.push(savedExercise.toJSON());
        const savedWorkout = await workout.save();
        return savedWorkout.toJSON() as WorkoutEntry;
    } catch (error) {
        throw new Error(`Could not add exercise to workout with id ${workoutId}`);
    }
};

const updateExerciseInWorkout = async (workoutId: string, exerciseId: string, newExercise: NewExercise): Promise<WorkoutEntry> => {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Workout with id ${workoutId} not found.`);
    }

    const updatedExercises = workout.exercises.map(exercise =>
        exercise.id === exerciseId ? { _id: new mongoose.Types.ObjectId(exerciseId), ...newExercise } : exercise
    );

    console.log('updated exercises:', updatedExercises);

    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(
            workoutId,
            { $set: { exercises: updatedExercises } },
            { new: true }
        );
        console.log('updated workout:', updatedWorkout);
        return updatedWorkout?.toJSON() as WorkoutEntry;
    }
    catch (error) {
        throw new Error(`Couldn't update exercise with id ${exerciseId}`);
    }
};

//const removeExerciseFromWorkout = async (workoutId: string, exerciseId: string): Promise<WorkoutEntry> => {
//   const workout = await Workout.findById(workoutId);
//   if (!workout) {
//       throw new Error(`Could not find a workout with the id ${workoutId}`);
//   }
//   workout.exercises = workout.exercises.filter(exercise => exercise._id?.toString() !== exerciseId);
//   const updatedWorkout = await workout.save();
//   return toNewWorkoutEntry(updatedWorkout);
//};

export default {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    addExerciseToWorkout,
    updateExerciseInWorkout,
    //removeExerciseFromWorkout
};
