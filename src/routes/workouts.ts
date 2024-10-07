import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import workoutService from '../services/workoutService';
import { toNewWorkout, toNewExercise } from '../utils';

const workoutRouter = express.Router();

// workout related routes

workoutRouter.get('/', expressAsyncHandler(async (_req, res) => {
    res.send(await workoutService.getAllWorkouts());
}));

workoutRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    res.send(await workoutService.getWorkout(req.params.id));
}));

workoutRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newWorkout = toNewWorkout(req.body);
    const addedWorkout = await workoutService.createWorkout(newWorkout);
    res.json(addedWorkout);
}));

workoutRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const newWorkout = toNewWorkout(req.body);
    const updatedWorkout = await workoutService.updateWorkout(req.params.id, newWorkout);    
    res.json(updatedWorkout);
}));

workoutRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    await workoutService.deleteWorkout(req.params.id);
    res.status(204).send();
}));

// exercise related routes

workoutRouter.post('/:id/exercises', expressAsyncHandler(async (req, res) => {
   const newExercise = toNewExercise(req.body);
   const updatedWorkout = await workoutService.addExerciseToWorkout(req.params.id, newExercise);
   res.json(updatedWorkout);
}));

workoutRouter.put('/:workoutId/exercises/:exerciseId', expressAsyncHandler(async (req, res) => {
    const updatedExercise = toNewExercise(req.body);
    const updatedWorkout = await workoutService.updateExerciseInWorkout(req.params.workoutId, req.params.exerciseId, updatedExercise);
    res.json(updatedWorkout);
}));

workoutRouter.delete('/:workoutId/exercises/:exerciseId', expressAsyncHandler(async (req, res) => {
   await workoutService.removeExerciseFromWorkout(req.params.workoutId, req.params.exerciseId);
   res.status(204).send();
}));

export default workoutRouter;
