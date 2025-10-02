import mongoose from 'mongoose';
import { Exercise } from '../models/exercise';
import { Workout } from '../models/workout';
const getAllWorkouts = async () => {
    return await Workout.find({});
};
const getWorkout = async (id) => {
    const workout = await Workout.findById(id);
    if (!workout) {
        throw new Error(`Could not find workout with id ${id}`);
    }
    return workout.toJSON();
};
const createWorkout = async (newWorkout) => {
    const workout = new Workout({
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    });
    const savedWorkout = await workout.save();
    return savedWorkout.toJSON();
};
const updateWorkout = async (workoutId, newWorkout) => {
    const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, {
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    }, { new: true });
    if (!updatedWorkout) {
        throw new Error(`Workout with id ${workoutId} could not be found and updated`);
    }
    return updatedWorkout.toJSON();
};
const deleteWorkout = async (workoutId) => {
    return await Workout.findByIdAndDelete(workoutId);
};
const addExerciseToWorkout = async (workoutId, newExercise) => {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Could not find a workout with the id ${workoutId}`);
    }
    const exercise = new Exercise(newExercise);
    try {
        const savedExercise = await exercise.save();
        workout.exercises.push(savedExercise.toJSON());
        const savedWorkout = await workout.save();
        return savedWorkout.toJSON();
    }
    catch (error) {
        throw new Error(`Could not add exercise to workout with id ${workoutId}`);
    }
};
const updateExerciseInWorkout = async (workoutId, exerciseId, newExercise) => {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Workout with id ${workoutId} not found.`);
    }
    const updatedExercises = workout.exercises.map(exercise => exercise.id === exerciseId ? { _id: new mongoose.Types.ObjectId(exerciseId), ...newExercise } : exercise);
    try {
        const updatedWorkout = await Workout.findByIdAndUpdate(workoutId, { $set: { exercises: updatedExercises } }, { new: true });
        return updatedWorkout?.toJSON();
    }
    catch (error) {
        throw new Error(`Couldn't update exercise with id ${exerciseId}`);
    }
};
const removeExerciseFromWorkout = async (workoutId, exerciseId) => {
    const workout = await Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Could not find a workout with the id ${workoutId}`);
    }
    workout.exercises = workout.exercises.filter(exercise => exercise.id !== exerciseId);
    const updatedWorkout = await workout.save();
    return updatedWorkout.toJSON();
};
export default {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    addExerciseToWorkout,
    updateExerciseInWorkout,
    removeExerciseFromWorkout
};
