import mongoose, { Document, Schema } from 'mongoose';

interface IDay extends Document {
    date: Date;
    completed: boolean;
}

interface IHabit extends Document {
    name: string;
    days: IDay[];
    user: Schema.Types.ObjectId;
}

const daySchema = new Schema<IDay>({
    date: {
        type: Date,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

const habitSchema = new Schema<IHabit>({
    name: {
        type: String,
        required: true
    },
    days: {
        type: [daySchema],
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

habitSchema.set('toJSON', {
    transform: (_document, returnedObject: any) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

export const Habit = mongoose.model<IHabit>('Habit', habitSchema);
