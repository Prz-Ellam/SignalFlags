import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLenght: 20
    },
    description: {
        type: String,
        minLength: 1,
        maxLenght: 255
    },
    image: {
        type: String
    },
    subgroups: {
        type: Array,
        default: []
    },
    homeworks: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
});

export default model('Group', groupSchema);