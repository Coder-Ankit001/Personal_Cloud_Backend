import dotenv from 'dotenv';
dotenv.config();

const env = {
    PORT: process.env.PORT || 3000,
};

export default env;