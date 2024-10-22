"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const exercise_1 = require("../models/exercise");
const workout_1 = require("../models/workout");
const getAllWorkouts = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield workout_1.Workout.find({});
});
const getWorkout = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const workout = yield workout_1.Workout.findById(id);
    if (!workout) {
        throw new Error(`Could not find workout with id ${id}`);
    }
    return workout.toJSON();
});
const createWorkout = (newWorkout) => __awaiter(void 0, void 0, void 0, function* () {
    const workout = new workout_1.Workout({
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    });
    const savedWorkout = yield workout.save();
    return savedWorkout.toJSON();
});
const updateWorkout = (workoutId, newWorkout) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedWorkout = yield workout_1.Workout.findByIdAndUpdate(workoutId, {
        title: newWorkout.title,
        day: newWorkout.day,
        exercises: newWorkout.exercises
    }, { new: true });
    if (!updatedWorkout) {
        throw new Error(`Workout with id ${workoutId} could not be found and updated`);
    }
    return updatedWorkout.toJSON();
});
const deleteWorkout = (workoutId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield workout_1.Workout.findByIdAndDelete(workoutId);
});
const addExerciseToWorkout = (workoutId, newExercise) => __awaiter(void 0, void 0, void 0, function* () {
    const workout = yield workout_1.Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Could not find a workout with the id ${workoutId}`);
    }
    const exercise = new exercise_1.Exercise(newExercise);
    try {
        const savedExercise = yield exercise.save();
        workout.exercises.push(savedExercise.toJSON());
        const savedWorkout = yield workout.save();
        return savedWorkout.toJSON();
    }
    catch (error) {
        throw new Error(`Could not add exercise to workout with id ${workoutId}`);
    }
});
const updateExerciseInWorkout = (workoutId, exerciseId, newExercise) => __awaiter(void 0, void 0, void 0, function* () {
    const workout = yield workout_1.Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Workout with id ${workoutId} not found.`);
    }
    const updatedExercises = workout.exercises.map(exercise => exercise.id === exerciseId ? Object.assign({ _id: new mongoose_1.default.Types.ObjectId(exerciseId) }, newExercise) : exercise);
    try {
        const updatedWorkout = yield workout_1.Workout.findByIdAndUpdate(workoutId, { $set: { exercises: updatedExercises } }, { new: true });
        return updatedWorkout === null || updatedWorkout === void 0 ? void 0 : updatedWorkout.toJSON();
    }
    catch (error) {
        throw new Error(`Couldn't update exercise with id ${exerciseId}`);
    }
});
const removeExerciseFromWorkout = (workoutId, exerciseId) => __awaiter(void 0, void 0, void 0, function* () {
    const workout = yield workout_1.Workout.findById(workoutId);
    if (!workout) {
        throw new Error(`Could not find a workout with the id ${workoutId}`);
    }
    workout.exercises = workout.exercises.filter(exercise => exercise.id !== exerciseId);
    const updatedWorkout = yield workout.save();
    return updatedWorkout.toJSON();
});
exports.default = {
    getAllWorkouts,
    getWorkout,
    createWorkout,
    updateWorkout,
    deleteWorkout,
    addExerciseToWorkout,
    updateExerciseInWorkout,
    removeExerciseFromWorkout
};
