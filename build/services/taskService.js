import { Task as TaskModel } from "../models/task";
const getAllTasks = async () => {
    return await TaskModel.find({});
};
const getTask = async (id) => {
    const task = await TaskModel.findById(id);
    if (!task) {
        throw Error(`Could not find task with id: ${id}`);
    }
    return task.toJSON();
};
const createTask = async (newTask) => {
    const task = new TaskModel(newTask);
    const savedTask = await task.save();
    return savedTask.toJSON();
};
const updateTask = async (id, newTask) => {
    const updatedTask = await TaskModel.findByIdAndUpdate(id, newTask, { new: true });
    if (!updatedTask) {
        throw Error(`Could not find task with id: ${id}`);
    }
    return updatedTask.toJSON();
};
const deletedTask = async (id) => {
    return await TaskModel.findByIdAndDelete(id);
};
export default {
    getAllTasks,
    getTask,
    createTask,
    updateTask,
    deletedTask
};
