import mongoose, { Schema } from "mongoose";
const taskSchema = new Schema({
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
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
taskSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});
export const Task = mongoose.model('Task', taskSchema);
