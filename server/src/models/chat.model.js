import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    name: {
        type: String
    },
    type: {
        type: String, 
        enum: ['Individual', 'Group'], 
        required: true 
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    avatar: {
        type: String
    }
},
{
    timestamps: true
});

export default model('Chat', chatSchema);