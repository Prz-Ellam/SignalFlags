import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
},
{
    timestamps: true
});

export default model('Group', groupSchema);