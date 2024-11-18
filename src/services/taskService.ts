import { Task as TaskModel } from "../models/task";
import { Task, NewTask } from "../types";

const getAllTasks = async (): Promise<Task[]> => {
    return await TaskModel.find({});
};

const getTask = async (id: string): Promise<Task> => {
    const task = await TaskModel.findById(id);
    if (!task) {
        throw Error(`Could not find task with id: ${id}`);
    }
    return task.toJSON();
};

const createTask = async (newTask: NewTask): Promise<Task> => {
    const task = new TaskModel(newTask);
    const savedTask = await task.save();
    return savedTask.toJSON();
};

const updateTask = async (id: string, newTask: NewTask): Promise<Task> => {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, newTask, { new: true });
    if (!updatedTask) {
        throw Error(`Could not find task with id: ${id}`);
    }
    return updatedTask.toJSON();
};

const deletedTask = async (id: string) => {
    return await TaskModel.findByIdAndDelete(id);
};

export default {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deletedTask
};