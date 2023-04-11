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
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Group'
    },
    delivers: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            deliverDate: {
                type: String
            }
        }
    ]
},
{
    timestamps: true
});

export default model('Homework', homeworkSchema);