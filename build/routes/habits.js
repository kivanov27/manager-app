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
const habitService_1 = __importDefault(require("../services/habitService"));
const utils_1 = require("../utils");
const habitRouter = express_1.default.Router();
habitRouter.get('/', (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habits = yield habitService_1.default.getAllHabits();
    res.json(habits);
})));
habitRouter.get('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const habit = yield habitService_1.default.getHabit(req.params.id);
    res.json(habit);
})));
habitRouter.post('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newHabit = (0, utils_1.toNewHabit)(req.body);
    const habit = yield habitService_1.default.createHabit(newHabit);
    res.status(201).json(habit);
})));
habitRouter.put('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedHabit = (0, utils_1.toNewHabit)(req.body);
    const habit = yield habitService_1.default.updateHabit(req.params.id, updatedHabit);
    res.json(habit);
})));
habitRouter.delete('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield habitService_1.default.deleteHabit(req.params.id);
    res.status(204).end();
})));
exports.default = habitRouter;
