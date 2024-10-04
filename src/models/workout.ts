import mongoose, { Document, Schema } from 'mongoose';
import { ExerciseEntry } from '../types';

interface IWorkout extends Document {
    title: string;
    day: string;
    exercises: ExerciseEntry[];
}

const workoutSchema = new Schema<IWorkout>({
    title: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    exercises: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Exercise',
        }
    ],
});

workoutSchema.set('toJSON', {
    transform: (_document, returnedObject: Partial<IWorkout & { _id: mongoose.Types.ObjectId }>) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

export const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);
