import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    text: {
        type: String,
        trim: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
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
            },
        }
    ],
    viewed_by: [
        {
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
            viewed_at: {
                type: Date,
                default: Date.now
            }
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

export default model('Message', messageSchema);