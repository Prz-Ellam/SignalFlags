import { Schema, mode } from 'mongoose';

const groupSchema = new Schema({
    title: {
        type: String
    },
    description: {
        type: String
    }
});