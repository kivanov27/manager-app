import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import workoutService from '../services/workoutService';
import { toNewExerciseEntry, toNewWorkoutEntry } from '../utils';

const workoutRouter = express.Router();

workoutRouter.get('/', expressAsyncHandler(async (_req, res) => {
    res.send(await workoutService.getEntries());
}));

workoutRouter.get('/:id', expressAsyncHandler(async(req, res) => {
    res.send(await workoutService.findById(Number(req.params.id)));
}));

workoutRouter.post('/', expressAsyncHandler(async (req, res) => {
    const updatedWorkout = toNewWorkoutEntry(req.body);
    const addedWorkout = await workoutService.addWorkout(updatedWorkout);
    res.json(addedWorkout);
}));

workoutRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const newExercise = toNewExerciseEntry(req.body);
    const updatedWorkout = await workoutService.addExercise(req.params.id, newExercise);
    res.json(updatedWorkout);
}));

export default workoutRouter;
