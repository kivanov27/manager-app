"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const habit_1 = require("../models/habit");
const getAllHabits = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield habit_1.Habit.find({});
});
const getHabit = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const habit = yield habit_1.Habit.findById(id);
    if (!habit) {
        throw new Error(`Could not find habit with id ${id}.`);
    }
    return habit.toJSON();
});
const createHabit = (newHabit) => __awaiter(void 0, void 0, void 0, function* () {
    const habit = new habit_1.Habit(newHabit);
    const savedHabit = yield habit.save();
    return savedHabit.toJSON();
});
const updateHabit = (id, newHabit) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedHabit = yield habit_1.Habit.findByIdAndUpdate(id, newHabit, { new: true });
    if (!updatedHabit) {
        throw new Error(`Could not find habit with id ${id}`);
    }
    return updatedHabit.toJSON();
});
const deleteHabit = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield habit_1.Habit.findByIdAndDelete(id);
});
exports.default = {
    getAllHabits,
    getHabit,
    createHabit,
    updateHabit,
    deleteHabit
};
