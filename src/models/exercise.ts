import mongoose, { Document, Schema } from 'mongoose';

interface IExercise extends Document {
    name: string;
    sets?: number;
    reps?: number;
    duration?: string;
    weight?: string;
}

const exerciseSchema = new Schema<IExercise>({
    name: {
        type: String,
        required: true
    },
    sets: Number,
    reps: Number,
    duration: String,
    weight: String
});

exerciseSchema.set('toJSON', {
    transform: (_document, returnedObject: Partial<IExercise & { _id: mongoose.Types.ObjectId }>) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
