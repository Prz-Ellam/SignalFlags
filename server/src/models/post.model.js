import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    title: {
        type: String
    }
});