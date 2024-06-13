import {
  S3Client,
  GetObjectCommand,
  GetBucketCommand,
} from "@aws-sdk/client-s3";

const getClient = (region = "us-east-1") => new S3Client({ region });

const getBucket = async (bucketName) => {
  const client = getClient();
  const command = new GetBucketCommand({ Bucket: bucketName });
  const response = await client.send(command);
  return response;
};

const getObject = async (bucketName, objectName) => {
  const client = getClient();
  const command = new GetObjectCommand({ Bucket: bucketName, Key: objectName });
  const response = await client.send(command);
  return response;
};

export { getBucket, getObject };
