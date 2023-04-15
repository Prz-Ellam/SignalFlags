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
    score: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    }
},
{
    timestamps: true,
    versionKey: false
});

export default model('User', userSchema);