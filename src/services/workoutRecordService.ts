import { WorkoutRecord as Record } from '../models/workoutRecords.ts';
import { WorkoutRecord, NewWorkoutRecord } from '../types.ts';

const getAllRecords = async (): Promise<WorkoutRecord[]> => {
    return await Record.find({});
};

const getRecord = async (id: string): Promise<WorkoutRecord> => {
    const record = await Record.findById(id);
    if (!record) {
        throw new Error(`Could not find record with id ${id}`);
    }
    return record.toJSON();
};

const createRecord = async (newRecord: NewWorkoutRecord): Promise<WorkoutRecord> => {
    const record = new Record(newRecord);
    const savedRecord = await record.save();
    return savedRecord.toJSON();
};

const updateRecord = async (id: string, newRecord: NewWorkoutRecord): Promise<WorkoutRecord> => {
    const updatedRecord = await Record.findByIdAndUpdate(id, newRecord, { new: true });
    if (!updatedRecord) {
        throw new Error(`Could not find record with id ${id}`);
    }
    return updatedRecord.toJSON();
};

const deleteRecord = async (id: string) => {
    return await Record.findByIdAndDelete(id);
};

export default {
    getAllRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord
};
