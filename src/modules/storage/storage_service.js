import { Upload } from "@aws-sdk/lib-storage"
import { GetObjectCommand } from "@aws-sdk/client-s3"
import { DeleteObjectCommand } from "@aws-sdk/client-s3"
import { ListObjectsV2Command } from "@aws-sdk/client-s3";

import env from "../../config/env.js";
import { s3 } from "../../config/s3.js";

// Upload Stream
export async function uploadStream({
  stream,
  storagePath,
  contentType
}) {
  const upload = new Upload({
    client: s3,
    params: {
      Bucket: env.SUPABASE_S3_BUCKET,
      Key: storagePath,
      Body: stream,
      ContentType: contentType
    }
  })
  return upload.done();
}


// Download Stream
export async function getObject({storagePath}) {
    return s3.send(
        new GetObjectCommand({
            Bucket: env.SUPABASE_S3_BUCKET,
            Key: storagePath,
        })
    )
}


// Delete Object
export async function deleteObject({storagePath}) {
    return s3.send(
        new DeleteObjectCommand({
            Bucket: env.SUPABASE_S3_BUCKET,
            Key: storagePath,
        })
    )
}


// List Objects
export async function listObjects(){
    await s3.send(
        new ListObjectsV2Command({
            Bucket: env.SUPABASE_S3_BUCKET,
        })
    )
}