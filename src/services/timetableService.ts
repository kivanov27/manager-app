import { Timetable as TimetableModel } from "../models/timetable";
import { Timetable, NewTimetable } from "../types";

const getAllTimetables = async (): Promise<Timetable[]> => {
    return await TimetableModel.find({});
};

const getTimetable = async (id: string): Promise<Timetable> => {
    const timetable = await TimetableModel.findById(id);
    if (!timetable) {
        throw Error(`Could not find timetable with id: ${id}`);
    }
    return timetable.toJSON();
};

const createTimetable = async (newTimetable: NewTimetable): Promise<Timetable> => {
    const timetable = new TimetableModel(newTimetable);
    const savedTimetable = await timetable.save();
    return savedTimetable.toJSON();
};

const updateTimetable = async (id: string, newTimetable: NewTimetable): Promise<Timetable> => {
    const updatedTimetable = await TimetableModel.findByIdAndUpdate(id, newTimetable, { new: true });
    if (!updatedTimetable) {
        throw Error(`Could not find timetable with id: ${id}`);
    }
    return updatedTimetable.toJSON();
};

const deletedTimetable = async (id: string) => {
    return await TimetableModel.findByIdAndDelete(id);
};

export default {
    getAllTimetables,
    getTimetable,
    createTimetable,
    updateTimetable,
    deletedTimetable
};
