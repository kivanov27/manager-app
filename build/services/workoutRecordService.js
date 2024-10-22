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
const workoutRecords_1 = require("../models/workoutRecords");
const getAllRecords = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield workoutRecords_1.WorkoutRecord.find({});
});
const getRecord = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const record = yield workoutRecords_1.WorkoutRecord.findById(id);
    if (!record) {
        throw new Error(`Could not find record with id ${id}`);
    }
    return record.toJSON();
});
const createRecord = (newRecord) => __awaiter(void 0, void 0, void 0, function* () {
    const record = new workoutRecords_1.WorkoutRecord(newRecord);
    const savedRecord = yield record.save();
    return savedRecord.toJSON();
});
const updateRecord = (id, newRecord) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedRecord = yield workoutRecords_1.WorkoutRecord.findByIdAndUpdate(id, newRecord, { new: true });
    if (!updatedRecord) {
        throw new Error(`Could not find record with id ${id}`);
    }
    return updatedRecord.toJSON();
});
const deleteRecord = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield workoutRecords_1.WorkoutRecord.findByIdAndDelete(id);
});
exports.default = {
    getAllRecords,
    getRecord,
    createRecord,
    updateRecord,
    deleteRecord
};
