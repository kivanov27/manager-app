import mongoose, { Schema } from 'mongoose';
import { exerciseSchema } from './exercise';
const workoutSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    exercises: [exerciseSchema],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
workoutSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});
export const Workout = mongoose.model('Workout', workoutSchema);
