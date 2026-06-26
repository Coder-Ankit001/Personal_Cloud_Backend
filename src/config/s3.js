import env from "./env.js";
import { S3Client } from "@aws-sdk/client-s3"

export const s3 = new S3Client({
  region: env.SUPABASE_S3_REGION,
  endpoint: env.SUPABASE_S3_ENDPOINT,
  forcePathStyle: true,

  credentials: {
    accessKeyId: env.SUPABASE_S3_ACCESS_KEY,
    secretAccessKey: env.SUPABASE_S3_SECRET_KEY,
  },
});