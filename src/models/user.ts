import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
    workouts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workout'
        }
    ],
    workoutRecords: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'WorkoutRecord'
        }
    ],
    habits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Habit'
        }
    ],
    tasks: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Task'
        }
    ]
});

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = document._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
        delete returnedObject.passwordHash;
    }
});

export const User = mongoose.model('User', userSchema);

