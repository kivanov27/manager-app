import mongoose, { Document, Schema } from 'mongoose';
import { NewExerciseEntry } from '../types';

interface IWorkout extends Document {
    title: string;
    day: string;
    exercises: NewExerciseEntry[];
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
            name: String,
            sets: Number,
            reps: Number,
            duration: String,
            weight: String
        }
    ]
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

