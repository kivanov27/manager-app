import mongoose, { Document, Schema } from "mongoose";
import { Exercise } from "../types";
import { exerciseSchema } from "./exercise";

interface IWorkoutRecord extends Document {
    title: string;
    day: string;
    date: string;
    exercises: Exercise[];
    user: Schema.Types.ObjectId;
}

const workoutRecordSchema = new Schema<IWorkoutRecord>({
    title: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    date: {
        type: String,
    required: true
    },
    exercises: [exerciseSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

workoutRecordSchema.set('toJSON', {
    transform: (_document, returnedObject: Partial<IWorkoutRecord & { _id: mongoose.Types.ObjectId }>) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

export const WorkoutRecord = mongoose.model<IWorkoutRecord>('WorkoutRecord', workoutRecordSchema);
