import mongoose from 'mongoose';

export const dbConnection = async() => {

    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/MERN_STACK_EVENT_MESSAGE', {

            useNewUrlParser: true,

            useUnifiedTopology: true
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);

    } catch (error) {

        console.error(error);
        process.exit(1);
    }

}