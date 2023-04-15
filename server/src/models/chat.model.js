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
        enum: ['individual', 'group'],
        required: true,
        default: 'individual'
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    // TODO: admins
    groupAdmin: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    },
    unseenMessages: {
        type: Number,
        default: 0
    },
    activeUsers: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    active: {
        type: Boolean,
        default: true
    }
},
{
    timestamps: true,
    versionKey: false
});

export default model('Chat', chatSchema);