import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import exerciseService from '../services/exerciseService';
import { toNewExerciseEntry } from '../utils';

const exerciseRouter = express.Router();

exerciseRouter.get('/', (_req, res) => {
    res.send(exerciseService.getEntries());
});

exerciseRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newExercise = toNewExerciseEntry(req.body);
    const addedExercise = await exerciseService.addExercise(newExercise);
    res.json(addedExercise);
}));

//exerciseRouter.get('/:id', (req, res) => {
//    const exercise = exerciseService.findById(Number(req.params.id));
//
//    if (exercise) {
//        res.send(exercise);
//    }
//    else {
//        res.sendStatus(404);
//    }
//});

export default exerciseRouter;
