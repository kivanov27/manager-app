/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import workoutService from '../services/workoutService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(workoutService.getEntries());
});

router.post('/', (req, res) => {
    const { title, date, exercises } = req.body;
    const addedWorkout = workoutService.addWorkout({
        title,
        date,
        exercises,
    });
    res.json(addedWorkout);
});

router.get('/:id', (req, res) => {
    const workout = workoutService.findById(Number(req.params.id));

    if (workout) {
        res.send(workout);
    } else {
        res.sendStatus(404);
    }
});

export default router;
