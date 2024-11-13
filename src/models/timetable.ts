import mongoose, { Document, Schema } from "mongoose";

interface ITask {
    startsAt: Date,
    endsAt: Date,
    task: string,
    completed: boolean
}

interface ITimetable extends Document {
    tasks: ITask[]
}

const taskSchema = new Schema<ITask>({
    startsAt: {
        type: Date,
        required: true
    },
    endsAt: Date,
    task: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
});

const timetableSchema = new Schema<ITimetable>({
    tasks: [taskSchema]
});

timetableSchema.set('toJSON', {
    transform: (_document, returnedObject: Partial<ITimetable & { _id: mongoose.Types.ObjectId }>) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});

export const Timetable = mongoose.model<ITimetable>('Timetable', timetableSchema);
