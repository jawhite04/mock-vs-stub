const { S3Client, GetObjectCommand, ListObjectsCommand } = require('@aws-sdk/client-s3');

const getClient = (region = 'us-east-1') => new S3Client({ region });

const listObjects = async (bucketName) => {
  const client = getClient();
  const command = new ListObjectsCommand({ Bucket: bucketName });
  const response = await client.send(command);
  return response;
};

const getObject = async (bucketName, objectName) => {
  const client = getClient();
  const command = new GetObjectCommand({ Bucket: bucketName, Key: objectName });
  const response = await client.send(command);
  return response;
};

module.exports = { listObjects, getObject };
