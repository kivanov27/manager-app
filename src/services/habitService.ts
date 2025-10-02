import { Habit as HabitModel } from "../models/habit.ts";
import { Habit, NewHabit } from "../types.ts";

const getAllHabits = async (): Promise<Habit[]> => {
    return await HabitModel.find({});
};

const getHabit = async (id: string): Promise<Habit> => {
    const habit = await HabitModel.findById(id);
    if (!habit) {
        throw new Error(`Could not find habit with id ${id}.`);
    }
    return habit.toJSON();
};

const createHabit = async (newHabit: NewHabit): Promise<Habit> => {
    const habit = new HabitModel(newHabit);
    const savedHabit = await habit.save();
    return savedHabit.toJSON();
};

const updateHabit = async (id: string, newHabit: NewHabit): Promise<Habit> => {
    const updatedHabit = await HabitModel.findByIdAndUpdate(id, newHabit, { new: true });
    if (!updatedHabit) {
        throw new Error(`Could not find habit with id ${id}`);
    }
    return updatedHabit.toJSON();
};

const deleteHabit = async (id: string) => {
    return await HabitModel.findByIdAndDelete(id);
};

export default {
    getAllHabits,
    getHabit,
    createHabit,
    updateHabit,
    deleteHabit
};
