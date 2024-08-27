import mongoose from 'mongoose';

const exerciseSchema = new mongoose.Schema({
    name: {
        type: string,
        required: true
    },
    sets: number,
    reps: number,
    duration: string,
    weight: string
});

exerciseSchema.set('toJSON', {
    transform: (_document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
