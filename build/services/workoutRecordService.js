import { WorkoutRecord as Record } from '../models/workoutRecords';
const getAllRecords = async () => {
    return await Record.find({});
};
const getRecord = async (id) => {
    const record = await Record.findById(id);
    if (!record) {
        throw new Error(`Could not find record with id ${id}`);
    }
    return record.toJSON();
};
const createRecord = async (newRecord) => {
    const record = new Record(newRecord);
    const savedRecord = await record.save();
    return savedRecord.toJSON();
};
const updateRecord = async (id, newRecord) => {
    const updatedRecord = await Record.findByIdAndUpdate(id, newRecord, { new: true });
    if (!updatedRecord) {
        throw new Error(`Could not find record with id ${id}`);
    }
    return updatedRecord.toJSON();
};
const deleteRecord = async (id) => {
    return await Record.findByIdAndDelete(id);
};
export default {
    getAllRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord
};
