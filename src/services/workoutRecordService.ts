import { WorkoutRecord } from '../models/workoutRecords';
import { Workout, NewWorkout } from '../types';

const getAllRecords = async (): Promise<Workout[]> => {
    return await WorkoutRecord.find({});
};

const getRecord = async (id: string): Promise<Workout> => {
    const record = await WorkoutRecord.findById(id);
    if (!record) {
        throw new Error(`Could not find record with id ${id}`);
    }
    return record.toJSON();
};

const createRecord = async (newRecord: NewWorkout): Promise<Workout> => {
    const record = new WorkoutRecord({
        title: newRecord.title,
        day: newRecord.day,
        exercises: newRecord.exercises
    });
    const savedRecord = await record.save();
    return savedRecord.toJSON();
};

const updateRecord = async (id: string, newRecord: NewWorkout): Promise<Workout> => {
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