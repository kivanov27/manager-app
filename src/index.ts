import express from 'express';
const app = express();
import {PORT, URL} from './utils/config';
import mongoose from 'mongoose';

import workoutRouter from './routes/workouts';

app.use(express.json());

app.get('/ping', (_req, res) => {
    console.log("someone pinged here.");
    res.send('pong');
});

app.use('/api/workouts', workoutRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
