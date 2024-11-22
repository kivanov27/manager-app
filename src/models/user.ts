import mongoose from "mongoose";

interface IUser extends mongoose.Document {
    username: string;
    passwordHash: string;
    workouts: mongoose.Schema.Types.ObjectId;
    workoutRecords: mongoose.Schema.Types.ObjectId;
    habits: mongoose.Schema.Types.ObjectId;
    tasks: mongoose.Schema.Types.ObjectId;
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true
    },
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
    transform: (_document, returnedObject: Partial<IUser & { _id: mongoose.Types.ObjectId }>) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
            delete returnedObject.passwordHash;
        }
    }
});

export const User = mongoose.model('User', userSchema);

