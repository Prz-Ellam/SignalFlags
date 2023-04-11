import { Schema, model } from 'mongoose';

const userSocketSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
{
    timestamps: true
});

export default model('UserSocket', userSocketSchema);