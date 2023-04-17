import { Schema, model } from 'mongoose';

const deliverSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date
    },
    homework: {
        type: Schema.Types.ObjectId,
        ref: 'Homework'
    },
    attachments: [
        {
            name: {
                type: String
            },
            url: { 
                type: String, 
                required: true 
            },
            type: { 
                type: String,
                required: true 
            }
        }
    ]
},
{
    timestamps: true,
    versionKey: false
});

export default model('Deliver', deliverSchema);