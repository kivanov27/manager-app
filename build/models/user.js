"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: String,
    workouts: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ],
    workoutRecords: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'WorkoutRecord'
        }
    ],
    habits: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Habit'
        }
    ],
    tasks: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
});
userSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
            delete returnedObject.passwordHash;
        }
    }
});
exports.User = mongoose_1.default.model('User', userSchema);
