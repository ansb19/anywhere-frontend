import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.EXPO_PUBLIC_AWS_S3_AWS_REGION || "", // 환경 변수 또는 기본값 ""
  credentials: {
    accessKeyId: process.env.EXPO_PUBLIC_AWS_S3_ACCESS_KEY_ID || "", // 환경 변수 또는 기본값 ""
    secretAccessKey: process.env.EXPO_PUBLIC_AWS_S3_SECRET_ACCESS_KEY || "", // 환경 변수 또는 기본값 ""
  },
});

export default s3Client;
