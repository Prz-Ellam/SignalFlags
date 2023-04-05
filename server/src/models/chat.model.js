import { Schema, model } from 'mongoose';

const chatSchema = new Schema({
    avatar: {
        type: String
    },
    name: {
        type: String,
        trim: true
    },
    type: {
        type: String, 
        enum: [ 'individual', 'group' ], 
        required: true,
        default: 'individual'
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    groupAdmin: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }
},
{
    timestamps: true
});

export default model('Chat', chatSchema);