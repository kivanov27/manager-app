import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import workoutService from '../services/workoutService';
import { toExerciseEntry, toWorkoutEntry } from '../utils';

const workoutRouter = express.Router();

workoutRouter.get('/', expressAsyncHandler(async (_req, res) => {
    res.send(await workoutService.getEntries());
}));

workoutRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    res.send(await workoutService.findById(req.params.id));
}));

workoutRouter.post('/', expressAsyncHandler(async (req, res) => {
    const updatedWorkout = toWorkoutEntry(req.body);
    const addedWorkout = await workoutService.addWorkout(updatedWorkout);
    res.json(addedWorkout);
}));

workoutRouter.post('/:id/exercises', expressAsyncHandler(async (req, res) => {
    const newExercise = toExerciseEntry(req.body);
    res.send(await workoutService.addExercise(req.params.id, newExercise));
}));

workoutRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const newWorkout = toWorkoutEntry(req.body);
    const updatedWorkout = await workoutService.updateWorkout(req.params.id, newWorkout);    
    res.json(updatedWorkout);
}));

workoutRouter.put('/:id/exercises/:exerciseId', expressAsyncHandler(async (req, res) => {
    const updatedExercise = toExerciseEntry(req.body);
    const updatedWorkout = await workoutService.updateExercise(req.params.id, req.params.exerciseId, updatedExercise);
    res.json(updatedWorkout);
}));

workoutRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    res.send(await workoutService.deleteWorkout(req.params.id));
}));

//workoutRouter.delete('/:id/exercises/:exerciseId', expressAsyncHandler(async (req, res) => {
//    const updatedWorkout = await workoutService.deleteExercise(req.params.id, req.params.exerciseId);
//    res.json(updatedWorkout);
//}));

export default workoutRouter;
