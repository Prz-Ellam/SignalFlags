import { Schema, model } from 'mongoose';

const homeworkSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    dueDate: {
        type: String
    },
    group: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

export default model('Homework', homeworkSchema);