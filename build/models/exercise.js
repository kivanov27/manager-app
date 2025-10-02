import mongoose, { Schema } from 'mongoose';
export const exerciseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    sets: String,
    reps: String,
    duration: String,
    weight: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});
exerciseSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        if (returnedObject._id) {
            returnedObject.id = returnedObject._id.toString();
            delete returnedObject._id;
            delete returnedObject.__v;
        }
    }
});
export const Exercise = mongoose.model('Exercise', exerciseSchema);
