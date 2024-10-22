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
const node_test_1 = require("node:test");
const mongoose_1 = __importDefault(require("mongoose"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const habit_1 = require("../models/habit");
const assert_1 = __importDefault(require("assert"));
const api = (0, supertest_1.default)(app_1.default);
const initialHabits = [
    {
        name: 'habit1',
        day: {
            date: new Date(),
            completed: false
        }
    },
    {
        name: 'habit2',
        day: {
            date: new Date('October 18'),
            completed: true
        }
    }
];
(0, node_test_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield habit_1.Habit.deleteMany({});
    let habitObj = new habit_1.Habit(initialHabits[0]);
    yield habitObj.save();
    habitObj = new habit_1.Habit(initialHabits[1]);
    yield habitObj.save();
}));
(0, node_test_1.test)('habits are returned as json', () => __awaiter(void 0, void 0, void 0, function* () {
    yield api
        .get('/api/habits')
        .expect(200)
        .expect('Content-Type', /application\/json/);
}));
(0, node_test_1.test)('there are two habits', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get('/api/habits');
    assert_1.default.strictEqual(response.body.length, initialHabits.length);
}));
(0, node_test_1.test)('habit1 exists', () => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield api.get('/api/habits');
    assert_1.default.strictEqual(response.body[0].name, initialHabits[0].name);
}));
(0, node_test_1.after)(() => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.connection.close();
}));
