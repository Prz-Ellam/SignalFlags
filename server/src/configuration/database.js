import mongoose from 'mongoose';

const url = process.env.DATABASE_URL;

export default async () => {
    mongoose.set('strictQuery', false);
    try {
        await mongoose.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log('Database connected');
    }
    catch (error) {
        console.error(error);
    }
};