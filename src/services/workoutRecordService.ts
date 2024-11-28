import { WorkoutRecord as Record } from '../models/workoutRecords';
import { WorkoutRecord, NewWorkoutRecord } from '../types';
// import { User } from '../models/user';

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
    // const user = await User.findById(userId);
    // const record = new Record({
    //     title: newRecord.title,
    //     day: newRecord.day,
    //     date: newRecord.date,
    //     exercises: newRecord.exercises,
    //     user: user.id
    // });
    const record = new Record(newRecord);
    const savedRecord = await record.save();
    // user.workoutRecords = user.workoutRecords.concat(savedRecord._id);
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
