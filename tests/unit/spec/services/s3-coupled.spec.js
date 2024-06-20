describe('src/services/s3-coupled.js', () => {
  const mockClient = { send: jest.fn() };
  const mockS3 = {
    S3Client: jest.fn(() => mockClient),
    GetObjectCommand: jest.fn(),
    ListObjectsCommand: jest.fn(),
  };
  jest.mock('@aws-sdk/client-s3', () => mockS3);

  const service = require('../../../../src/services/s3-coupled');

  describe('listObjects', () => {
    it('returns a response from AWS SDK', async () => {
      // arrange
      const s3Objects = 'some response';
      mockClient.send.mockResolvedValueOnce(s3Objects);
      const bucketName = 'bucket-name';

      // act
      const response = await service.listObjects(bucketName);

      // assert
      expect(response).toEqual(s3Objects);

      expect(mockS3.S3Client).toHaveBeenCalledTimes(1);

      expect(mockS3.ListObjectsCommand).toHaveBeenCalledTimes(1);
      expect(mockS3.ListObjectsCommand).toHaveBeenCalledWith({ Bucket: bucketName });

      expect(mockClient.send).toHaveBeenCalledTimes(1);
      expect(mockClient.send).toHaveBeenCalledWith(expect.any(mockS3.ListObjectsCommand));
    });
  });

  describe('getObject', () => {
    it('returns a response from AWS SDK', async () => {
      // arrange
      const s3Objects = 'some response';
      mockClient.send.mockResolvedValueOnce(s3Objects);
      const bucketName = 'bucket-name';
      const fileName = 'file/name';

      // act
      const response = await service.getObject(bucketName, fileName);

      // assert
      expect(response).toEqual(s3Objects);

      expect(mockS3.S3Client).toHaveBeenCalledTimes(1);

      expect(mockS3.GetObjectCommand).toHaveBeenCalledTimes(1);
      expect(mockS3.GetObjectCommand).toHaveBeenCalledWith({ Bucket: bucketName, Key: fileName });

      expect(mockClient.send).toHaveBeenCalledTimes(1);
      expect(mockClient.send).toHaveBeenCalledWith(expect.any(mockS3.GetObjectCommand));
    });
  });
});
