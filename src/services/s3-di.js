const { S3Client, GetObjectCommand, ListObjectsCommand } = require('@aws-sdk/client-s3');

const getClient = (region = 'us-east-1') => new S3Client({ region });

const listObjects = async (Client, bucketName) => {
  const command = new ListObjectsCommand({ Bucket: bucketName });
  const response = await Client.send(command);
  return response;
};

const getObject = async (Client, bucketName, objectName) => {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: objectName });
  const response = await Client.send(command);
  return response;
};

module.exports = { getClient, listObjects, getObject };
