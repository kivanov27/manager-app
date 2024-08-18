import express from 'express';
import workoutService from '../services/workoutService';
import toNewWorkout from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(workoutService.getEntries());
});

router.post('/', (req, res) => {
    try {
        const newWorkout = toNewWorkout(req.body);
        const addedWorkout = workoutService.addWorkout(newWorkout);
        res.json(addedWorkout);
    }
    catch (error: unknown) {
        let errorMsg = 'Something went wrong.';
        if (error instanceof Error) {
            errorMsg += 'Error: ' + error.message;
        }
        res.status(400).send(errorMsg);
    }
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
