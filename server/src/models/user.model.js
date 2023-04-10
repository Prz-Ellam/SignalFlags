import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    avatar: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 255
    },
    password: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
},
{
    timestamps: true
});

export default model('User', userSchema);