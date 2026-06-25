import { Upload } from "@aws-sdk/lib-storage"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

import { s3 } from "../../config/s3.js";


export async function uploadStream({
  stream,
  storagePath,
  contentType
}) {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: process.env.SUPABASE_S3_BUCKET,
      Key: storagePath,
      Body: stream,
      ContentType: contentType
    }
  })
  return upload.done();
}

export async function getObject(storagePath) {
    return s3.send(
        new GetObjectCommand({
            Bucket: process.env.SUPABASE_S3_BUCKET,
            Key: storagePath,
        })
    )
}

export async function deleteObject(storagePath) {
    return s3.send(
        new DeleteObjectCommand({
            Bucket: process.env.SUPABASE_S3_BUCKET,
            Key: storagePath,
        })
    )
}
      
export async function listObjects(){
    await s3.send(
        new ListObjectsV2Command({
            Bucket: process.env.SUPABASE_S3_BUCKET,
        })
    )
}