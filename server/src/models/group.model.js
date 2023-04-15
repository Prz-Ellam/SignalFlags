import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 1,
        maxLenght: 20
    },
    description: {
        type: String,
        minLength: 1,
        maxLenght: 255
    },
    privacy: {
        type: String,
        required: true,
        enum: [ 'public', 'private' ]
    },
    code: {
        type: String
    },
    avatar: {
        type: String
    },
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    admins: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    subgroups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ]
},
{
    timestamps: true,
    versionKey: false
});

export default model('Group', groupSchema);