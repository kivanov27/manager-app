import { WorkoutRecord } from '../models/workoutRecords';
import { WorkoutRecord as Record, NewWorkoutRecord } from '../types';

const getAllRecords = async (): Promise<Record[]> => {
    return await WorkoutRecord.find({});
};

const getRecord = async (id: string): Promise<Record> => {
    const record = await WorkoutRecord.findById(id);
    if (!record) {
        throw new Error(`Could not find record with id ${id}`);
    }
    return record.toJSON();
};

const createRecord = async (newRecord: NewWorkoutRecord): Promise<Record> => {
    const record = new WorkoutRecord(newRecord);
    const savedRecord = await record.save();
    return savedRecord.toJSON();
};

const updateRecord = async (id: string, newRecord: NewWorkoutRecord): Promise<Record> => {
    const updatedRecord = await WorkoutRecord.findByIdAndUpdate(id, newRecord, { new: true });
    if (!updatedRecord) {
        throw new Error(`Could not find record with id ${id}`);
    }
    return updatedRecord.toJSON();
};

const deleteRecord = async (id: string) => {
    return await WorkoutRecord.findByIdAndDelete(id);
};

export default {
    getAllRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord
};