import { Schema, model } from 'mongoose';

const messageSchema = new Schema({
    text: {
        type: String,
        trim: true,
        maxLength: 512
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    attachments: [
        {
            url: { 
                type: String, 
                required: true 
            },
            type: { 
                type: String,
                required: true 
            }
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
    timestamps: true
});

export default model('Message', messageSchema);