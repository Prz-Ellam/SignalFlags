import { Schema, model } from 'mongoose';

const callSchema = new Schema({
    offerUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    answerUser: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    offer: {
        type: String
    },
    answer: {
        type: String
    },
    offerCandidates: [
        {
            type: String
        }
    ],
    answerCandidates: [
        {
            type: String
        }
    ]
},
{
    versionKey: false
});

export default model('Call', callSchema);