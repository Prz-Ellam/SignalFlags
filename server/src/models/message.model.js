import { Schema, mode } from 'mongoose';

const messageSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }
});