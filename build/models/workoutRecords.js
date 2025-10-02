import mongoose, { Schema } from "mongoose";
import { exerciseSchema } from "./exercise";
const workoutRecordSchema = new Schema({
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
    transform: (_document, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});
export const WorkoutRecord = mongoose.model('WorkoutRecord', workoutRecordSchema);
