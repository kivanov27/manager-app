import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import taskService from '../services/taskService';
import { toNewTask } from '../utils';

const taskRouter = express.Router();

taskRouter.get('/', expressAsyncHandler(async (_req, res) => {
    const tasks = await taskService.getAllTasks();
    res.json(tasks);
}));

taskRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const task = await taskService.getTask(req.params.id);
    res.json(task);
}));

taskRouter.post('/', expressAsyncHandler(async (req, res) => {
    const newTask = toNewTask(req.body);
    const task = await taskService.createTask(newTask);
    res.status(201).json(task);
}));

taskRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const updatedTask = toNewTask(req.body);
    const task = await taskService.updateTask(req.params.id, updatedTask);
    res.json(task);
}));

taskRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    await taskService.deletedTask(req.params.id);
    res.status(204).end();
}));

export default taskRouter;
