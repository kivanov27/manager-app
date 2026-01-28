import { Habit as HabitModel } from "../models/habit";
import { Habit, NewHabit } from "../types";
// import { User } from "../models/user";

const getAllHabits = async (): Promise<Habit[]> => {
    return await HabitModel.find({});
};

const getHabit = async (id: string): Promise<Habit> => {
    const habit = await HabitModel.findById(id);
    if (!habit) {
        throw new Error(`Could not find habit with id ${id}.`);
    }
    return habit;
};

const createHabit = async (newHabit: NewHabit): Promise<Habit> => {
    // const user = await User.findById(userId);
    // const habit = new HabitModel({
    //      name: newHabit.name,
    //      days: newHabit.days,
    //      user: user.id
    // });
    const habit = new HabitModel(newHabit);
    const savedHabit = await habit.save();
    // user.habits = user.habits.concat(savedHabit._id);
    return savedHabit;
};

const updateHabit = async (id: string, newHabit: NewHabit): Promise<Habit> => {
    const updatedHabit = await HabitModel.findByIdAndUpdate(id, newHabit, { new: true });
    if (!updatedHabit) {
        throw new Error(`Could not find habit with id ${id}`);
    }
    return updatedHabit;
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
