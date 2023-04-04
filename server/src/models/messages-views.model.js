import { Schema, model } from 'mongoose';

const messageViewSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    message: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }
},
{
    timestamps: true
});

export default model('MessageView', messageViewSchema);