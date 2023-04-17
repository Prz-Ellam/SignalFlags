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
        type: Date
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
            date: {
                type: Date
            }
        }
    ]
},
{
    timestamps: true,
    versionKey: false
});

export default model('Homework', homeworkSchema);