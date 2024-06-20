describe('src/performer.js', () => {
  describe('performCoupled', () => {
    const mockService = {
      listObjects: jest.fn(),
    };
    jest.mock('../../../src/services/s3-coupled', () => mockService);

    jest.resetModules();
    const { performCoupled } = require('../../../src/performer');

    it('should call listObjects with the bucket name', async () => {
      // arrange
      const contents = 'some contents';
      mockService.listObjects.mockResolvedValue({ Contents: contents });

      // act
      const response = await performCoupled();

      // assert
      expect(response).toEqual({ statusCode: 200, body: JSON.stringify(contents) });
      expect(mockService.listObjects).toHaveBeenCalledTimes(1);
      expect(mockService.listObjects).toHaveBeenCalledWith(expect.any(String));
    });
  });

  describe('performDi', () => {
    const mockClient = jest.fn();
    const mockService = {
      getClient: () => mockClient,
      listObjects: jest.fn(),
    };
    jest.mock('../../../src/services/s3-di', () => mockService);

    jest.resetModules();
    const { performDi } = require('../../../src/performer');

    it('should call listObjects with the client and bucket name', async () => {
      // arrange
      const contents = 'some contents';
      mockService.listObjects.mockResolvedValue({ Contents: contents });

      // act
      const response = await performDi();

      // assert
      expect(response).toEqual({ statusCode: 200, body: JSON.stringify(contents) });
      expect(mockService.listObjects).toHaveBeenCalledTimes(1);
      expect(mockService.listObjects).toHaveBeenCalledWith(mockClient, expect.any(String));
    });
  });
});
