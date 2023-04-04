import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    profilePicture: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minLength: 1,
        maxLength: 255
    },
    password: {
        type: String,
        required: true
    },
    groups: {
        type: Array,
        default: []
    }
},
{
    timestamps: true
});

export default model('User', userSchema);