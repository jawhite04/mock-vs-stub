import * as coupled from './services/s3-coupled';
import * as di from './services/s3-di';

export const performCoupled = async (/*event, context*/) => {
  const response = await coupled.listObjects('bucket-name');
  return {
    statusCode: 200,
    body: JSON.stringify(response.Contents),
  };
};

export const performDi = async (/*event, context*/) => {
  const client = di.getClient();
  const response = await di.listObjects(client, 'bucket-name');
  return {
    statusCode: 200,
    body: JSON.stringify(response.Contents),
  };
};

// const handler = perform;
// export { handler };
