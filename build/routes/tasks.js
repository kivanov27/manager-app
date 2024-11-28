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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const taskService_1 = __importDefault(require("../services/taskService"));
const utils_1 = require("../utils");
const taskRouter = express_1.default.Router();
taskRouter.get('/', (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield taskService_1.default.getAllTasks();
    res.json(tasks);
})));
taskRouter.get('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield taskService_1.default.getTask(req.params.id);
    res.json(task);
})));
taskRouter.post('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newTask = (0, utils_1.toNewTask)(req.body);
    const task = yield taskService_1.default.createTask(newTask);
    res.status(201).json(task);
})));
taskRouter.put('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedTask = (0, utils_1.toNewTask)(req.body);
    const task = yield taskService_1.default.updateTask(req.params.id, updatedTask);
    res.json(task);
})));
taskRouter.delete('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield taskService_1.default.deletedTask(req.params.id);
    res.status(204).end();
})));
exports.default = taskRouter;
