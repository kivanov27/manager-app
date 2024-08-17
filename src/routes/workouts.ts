import express from 'express';
import workoutService from '../services/workoutService';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(workoutService.getEntries());
});

router.post('/', (_req, res) => {
    res.send('Saving a workout');
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
