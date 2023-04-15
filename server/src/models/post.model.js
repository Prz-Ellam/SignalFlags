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
    ]
},
{
    timestamps: true,
    versionKey: false
});

export default model('Post', postSchema);