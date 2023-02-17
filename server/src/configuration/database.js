import mongoose from 'mongoose';

const url = 'mongodb://127.0.0.1:27017/signalflags';

export default async () => {
    mongoose.set("strictQuery", false);
    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(_db => console.log('Database connected'))
    .catch(error => console.error(error));
};