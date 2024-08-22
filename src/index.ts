import express from 'express';
import workoutRouter from './routes/workouts';
const app = express();
app.use(express.json());

const PORT = 3001;

app.get('/ping', (_req, res) => {
    console.log("someone pinged here.");
    res.send('pong');
});

app.use('/api/workouts', workoutRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
