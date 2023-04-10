import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

export default model('Post', postSchema);