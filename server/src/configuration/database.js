import mongoose from 'mongoose';

const url = process.env.DATABASE_URL;

export default async () => {
    mongoose.set('strictQuery', false);
    await mongoose.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(_db => console.log('Database connected'))
    .catch(error => console.error(error));
};