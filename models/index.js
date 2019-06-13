import mongoose from 'mongoose';

import Survey from './surveys';

const connectDb = () => {
    return mongoose.connect(process.env.DATABASE_URL);
};

const models = { Survey };

export { connectDb };

export default models;