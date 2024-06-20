describe('src/services/s3-di.js', () => {
  const mockClient = { send: jest.fn() };
  const mockS3 = {
    S3Client: jest.fn(() => mockClient),
    GetObjectCommand: jest.fn(),
    ListObjectsCommand: jest.fn(),
  };
  jest.mock('@aws-sdk/client-s3', () => mockS3);

  const service = require('../../../../src/services/s3-di');

  describe('getClient', () => {
    it('gets an instance of the S3 Client', () => {
      // act
      const response = service.getClient();

      // assert
      expect(response).toBe(mockClient);
    });
  });

  describe('listObjects', () => {
    it('returns a response from AWS SDK', async () => {
      // arrange
      const s3Objects = 'some response';
      const client = service.getClient();
      client.send.mockResolvedValueOnce(s3Objects);
      const bucketName = 'bucket-name';

      // act
      const response = await service.listObjects(client, bucketName);

      // assert
      expect(response).toEqual(s3Objects);

      expect(mockS3.ListObjectsCommand).toHaveBeenCalledTimes(1);
      expect(mockS3.ListObjectsCommand).toHaveBeenCalledWith({ Bucket: bucketName });

      expect(client.send).toHaveBeenCalledTimes(1);
      expect(client.send).toHaveBeenCalledWith(expect.any(mockS3.ListObjectsCommand));
    });
  });

  describe('getObject', () => {
    it('returns a response from AWS SDK', async () => {
      // arrange
      const s3Objects = 'some response';
      const client = service.getClient();
      client.send.mockResolvedValueOnce(s3Objects);
      const bucketName = 'bucket-name';
      const fileName = 'file/name';

      // act
      const response = await service.getObject(client, bucketName, fileName);

      // assert
      expect(response).toEqual(s3Objects);

      expect(mockS3.GetObjectCommand).toHaveBeenCalledTimes(1);
      expect(mockS3.GetObjectCommand).toHaveBeenCalledWith({ Bucket: bucketName, Key: fileName });

      expect(client.send).toHaveBeenCalledTimes(1);
      expect(client.send).toHaveBeenCalledWith(expect.any(mockS3.GetObjectCommand));
    });
  });
});
