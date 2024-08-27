import express from 'express';
import exerciseService from '../services/exerciseService';
import { toNewExerciseEntry } from '../utils';

const exerciseRouter = express.Router();

exerciseRouter.get('/', (_req, res) => {
    res.send(exerciseService.getEntries());
});

exerciseRouter.post('/', (req, res) => {
    try {
        const newExercise = toNewExerciseEntry(req.body);
        const addedExercise = exerciseService.addExercise(newExercise);
        res.json(addedExercise);
    }
    catch (error: unknown) {
        let errorMsg = 'Something went wrong.';
        if (error instanceof Error) {
            errorMsg += 'Error:' + error.message;
        }
        res.status(400).send(errorMsg);
    }
});

exerciseRouter.get('/:id', (req, res) => {
    const exercise = exerciseService.findById(Number(req.params.id));

    if (exercise) {
        res.send(exercise);
    }
    else {
        res.sendStatus(404);
    }
});

export default exerciseRouter;
