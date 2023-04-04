import { Schema, mode } from 'mongoose';

const chatSchema = new Schema({
    participants: {
        type: Array
    }
},
{
    timestamps: true
});

export default model('Chat', chatSchema);