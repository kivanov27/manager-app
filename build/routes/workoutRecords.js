import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import workoutRecordService from '../services/workoutRecordService';
import { toNewWorkoutRecord } from '../utils';
const workoutRecordRouter = express.Router();
workoutRecordRouter.get('/', expressAsyncHandler(async (_req, res) => {
    res.send(await workoutRecordService.getAllRecords());
}));
workoutRecordRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    res.send(await workoutRecordService.getRecord(req.params.id));
}));
workoutRecordRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newRecord = toNewWorkoutRecord(req.body);
    const addedRecord = await workoutRecordService.createRecord(newRecord);
    res.json(addedRecord);
}));
workoutRecordRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const newRecord = toNewWorkoutRecord(req.body);
    const updatedRecord = await workoutRecordService.updateRecord(req.params.id, newRecord);
    res.json(updatedRecord);
}));
workoutRecordRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    await workoutRecordService.deleteRecord(req.params.id);
    res.status(204).send();
}));
export default workoutRecordRouter;
