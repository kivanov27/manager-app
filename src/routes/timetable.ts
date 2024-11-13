import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import timetableService from '../services/timetableService';
import { toNewTimetable } from '../utils';

const timetableRouter = express.Router();

timetableRouter.get('/', expressAsyncHandler(async (_req, res) => {
    const timetables = await timetableService.getAllTimetables();
    res.json(timetables);
}));

timetableRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const timetable = await timetableService.getTimetable(req.params.id);
    res.json(timetable);
}));

timetableRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newTimetable = toNewTimetable(req.params.body);
    const habit = await timetableService.createTimetable(newTimetable);
    res.status(201).json(habit);
}));

timetableRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const updatedTimetable = toNewTimetable(req.params.body);
    const timetable = await timetableService.updateTimetable(req.params.id, updatedTimetable);
    res.json(timetable);
}));

timetableRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    await timetableService.deletedTimetable(req.params.id);
    res.status(204).end();
}));

export default timetableRouter;
