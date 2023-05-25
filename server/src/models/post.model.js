import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    content: {
        type: String
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
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
            size: {
                type: Number
            }
        }
    ],
    replies: [
        {
            content: {
                type: String
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ],
    activeUser: {
        type: Boolean
    }
},
{
    timestamps: true,
    versionKey: false
});

export default model('Post', postSchema);