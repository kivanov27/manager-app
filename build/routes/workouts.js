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
const workoutService_1 = __importDefault(require("../services/workoutService"));
const utils_1 = require("../utils");
const workoutRouter = express_1.default.Router();
// workout related routes
workoutRouter.get('/', (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield workoutService_1.default.getAllWorkouts());
})));
workoutRouter.get('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield workoutService_1.default.getWorkout(req.params.id));
})));
workoutRouter.post('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkout = (0, utils_1.toNewWorkout)(req.body);
    const addedWorkout = yield workoutService_1.default.createWorkout(newWorkout);
    res.json(addedWorkout);
})));
workoutRouter.put('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newWorkout = (0, utils_1.toNewWorkout)(req.body);
    const updatedWorkout = yield workoutService_1.default.updateWorkout(req.params.id, newWorkout);
    res.json(updatedWorkout);
})));
workoutRouter.delete('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield workoutService_1.default.deleteWorkout(req.params.id);
    res.status(204).send();
})));
// exercise related routes
workoutRouter.post('/:id/exercises', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newExercise = (0, utils_1.toNewExercise)(req.body);
    const updatedWorkout = yield workoutService_1.default.addExerciseToWorkout(req.params.id, newExercise);
    res.json(updatedWorkout);
})));
workoutRouter.put('/:workoutId/exercises/:exerciseId', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedExercise = (0, utils_1.toNewExercise)(req.body);
    const updatedWorkout = yield workoutService_1.default.updateExerciseInWorkout(req.params.workoutId, req.params.exerciseId, updatedExercise);
    res.json(updatedWorkout);
})));
workoutRouter.delete('/:workoutId/exercises/:exerciseId', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield workoutService_1.default.removeExerciseFromWorkout(req.params.workoutId, req.params.exerciseId);
    res.status(204).send();
})));
exports.default = workoutRouter;
