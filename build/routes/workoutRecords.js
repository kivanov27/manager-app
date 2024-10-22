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
const workoutRecordService_1 = __importDefault(require("../services/workoutRecordService"));
const utils_1 = require("../utils");
const workoutRecordRouter = express_1.default.Router();
workoutRecordRouter.get('/', (0, express_async_handler_1.default)((_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield workoutRecordService_1.default.getAllRecords());
})));
workoutRecordRouter.get('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send(yield workoutRecordService_1.default.getRecord(req.params.id));
})));
workoutRecordRouter.post('/', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecord = (0, utils_1.toNewWorkoutRecord)(req.body);
    const addedRecord = yield workoutRecordService_1.default.createRecord(newRecord);
    res.json(addedRecord);
})));
workoutRecordRouter.put('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRecord = (0, utils_1.toNewWorkoutRecord)(req.body);
    const updatedRecord = yield workoutRecordService_1.default.updateRecord(req.params.id, newRecord);
    res.json(updatedRecord);
})));
workoutRecordRouter.delete('/:id', (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield workoutRecordService_1.default.deleteRecord(req.params.id);
    res.status(204).send();
})));
exports.default = workoutRecordRouter;
