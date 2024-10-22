"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./utils/config");
const workouts_1 = __importDefault(require("./routes/workouts"));
const workoutRecords_1 = __importDefault(require("./routes/workoutRecords"));
const habits_1 = __importDefault(require("./routes/habits"));
const middleware = __importStar(require("./utils/middleware"));
mongoose_1.default.set('strictQuery', false);
if (config_1.URL) {
    mongoose_1.default.connect(config_1.URL)
        .then(() => {
        console.log('Connected to MongoDB');
    })
        .catch(error => {
        console.log('error connecting to MongoDB:', error);
    });
}
app.use((0, cors_1.default)());
app.use(express_1.default.static('dist'));
app.use(express_1.default.json());
app.use(middleware.requestLogger);
app.use('/api/workouts', workouts_1.default);
app.use('/api/workoutRecords', workoutRecords_1.default);
app.use('/api/habits', habits_1.default);
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
exports.default = app;
