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
    avatar: {
        type: String
    },
    subgroups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ],
    homeworks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Homework'
        }
    ]
},
{
    timestamps: true
});

export default model('Group', groupSchema);