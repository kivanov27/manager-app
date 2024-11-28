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
const task_1 = require("../models/task");
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_1.Task.find({});
});
const getTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_1.Task.findById(id);
    if (!task) {
        throw Error(`Could not find task with id: ${id}`);
    }
    return task.toJSON();
});
const createTask = (newTask) => __awaiter(void 0, void 0, void 0, function* () {
    const task = new task_1.Task(newTask);
    const savedTask = yield task.save();
    return savedTask.toJSON();
});
const updateTask = (id, newTask) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = yield task_1.Task.findByIdAndUpdate(id, newTask, { new: true });
    if (!updatedTask) {
        throw Error(`Could not find task with id: ${id}`);
    }
    return updatedTask.toJSON();
});
const deletedTask = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield task_1.Task.findByIdAndDelete(id);
});
exports.default = {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deletedTask
};
