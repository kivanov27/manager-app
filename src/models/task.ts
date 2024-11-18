import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
    startsAt: Date,
    endsAt: Date,
    task: string,
    completed: boolean
}

const taskSchema = new Schema<ITask>({
    startsAt: {
        type: Date,
        required: true
    },
    endsAt: {
        type: Date,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

taskSchema.set('toJSON', {
    transform: (_document, returnedObject: Partial<ITask & { _id: mongoose.Types.ObjectId }>) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

export const Task = mongoose.model<ITask>('Task', taskSchema);
