import mongoose, { Document, Schema } from 'mongoose';

interface IExercise extends Document {
    name: string;
    sets?: string;
    reps?: string;
    duration?: string;
    weight?: string;
    user?: Schema.Types.ObjectId;
}

export const exerciseSchema = new Schema<IExercise>({
    name: {
        type: String,
        required: true
    },
    sets: String,
    reps: String,
    duration: String,
    weight: String,
});

exerciseSchema.set('toJSON', {
    transform: (_document, returnedObject: any) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

export const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
