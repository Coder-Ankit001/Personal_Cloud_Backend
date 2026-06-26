import dotenv from 'dotenv';
dotenv.config();

const env = {
    PORT: process.env.PORT || 3000,
    FRONTEND_URL: process.env.FRONTEND_URL,
    JWT_ACCESS_TOKEN: process.env.JWT_ACCESS_TOKEN,
    JWT_REFRESH_TOKEN: process.env.JWT_REFRESH_TOKEN,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    SUPABASE_S3_ENDPOINT: process.env.SUPABASE_S3_ENDPOINT,
    SUPABASE_S3_REGION: process.env.SUPABASE_S3_REGION,
    SUPABASE_S3_ACCESS_KEY: process.env.SUPABASE_S3_ACCESS_KEY,
    SUPABASE_S3_SECRET_KEY: process.env.SUPABASE_S3_SECRET_KEY,
    SUPABASE_S3_BUCKET: process.env.SUPABASE_S3_BUCKET,
};

export default env;