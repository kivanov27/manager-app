import express from 'express';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send('Fetching all workouts');
});

router.post('/', (_req, res) => {
    res.send('Saving a workout');
});


export default router;
