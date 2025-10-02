import { Habit as HabitModel } from "../models/habit";
const getAllHabits = async () => {
    return await HabitModel.find({});
};
const getHabit = async (id) => {
    const habit = await HabitModel.findById(id);
    if (!habit) {
        throw new Error(`Could not find habit with id ${id}.`);
    }
    return habit.toJSON();
};
const createHabit = async (newHabit) => {
    const habit = new HabitModel(newHabit);
    const savedHabit = await habit.save();
    return savedHabit.toJSON();
};
const updateHabit = async (id, newHabit) => {
    const updatedHabit = await HabitModel.findByIdAndUpdate(id, newHabit, { new: true });
    if (!updatedHabit) {
        throw new Error(`Could not find habit with id ${id}`);
    }
    return updatedHabit.toJSON();
};
const deleteHabit = async (id) => {
    return await HabitModel.findByIdAndDelete(id);
};
export default {
    getAllHabits,
    getHabit,
    createHabit,
    updateHabit,
    deleteHabit
};
