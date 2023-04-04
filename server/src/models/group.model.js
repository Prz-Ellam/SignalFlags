import { Schema, model } from 'mongoose';

const groupSchema = new Schema({
    name: {
        type: Schema.Types.String,
        required: true
    },
    description: {
        type: Schema.Types.String
    },
    subgroups: {
        type: Schema.Types.Array
    },
    homeworks: {
        type: Schema.Types.Array
    }
},
{
    timestamps: true
});

export default model('Group', groupSchema);