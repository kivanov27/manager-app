import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import workoutService from '../services/workoutService';
import { toNewWorkoutEntry } from '../utils';

const workoutRouter = express.Router();

workoutRouter.get('/', (_req, res) => {
    res.send(workoutService.getEntries());
});

workoutRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newWorkout = toNewWorkoutEntry(req.body);
    const addedWorkout = await workoutService.addWorkout(newWorkout);
    res.json(addedWorkout);
}));

/* workoutRouter.get('/:id', (req, res) => {
    const workout = workoutService.findById(Number(req.params.id));

    if (workout) {
        res.send(workout);
    } else {
        res.sendStatus(404);
    }
}); */

export default workoutRouter;
