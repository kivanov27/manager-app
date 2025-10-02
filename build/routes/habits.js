import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import habitService from '../services/habitService';
import { toNewHabit } from '../utils';
const habitRouter = express.Router();
habitRouter.get('/', expressAsyncHandler(async (_req, res) => {
    const habits = await habitService.getAllHabits();
    res.json(habits);
}));
habitRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const habit = await habitService.getHabit(req.params.id);
    res.json(habit);
}));
habitRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newHabit = toNewHabit(req.body);
    const habit = await habitService.createHabit(newHabit);
    res.status(201).json(habit);
}));
habitRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const updatedHabit = toNewHabit(req.body);
    const habit = await habitService.updateHabit(req.params.id, updatedHabit);
    res.json(habit);
}));
habitRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    await habitService.deleteHabit(req.params.id);
    res.status(204).end();
}));
export default habitRouter;
