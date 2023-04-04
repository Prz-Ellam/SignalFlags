import { Schema, model } from 'mongoose';

const homeworkSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
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