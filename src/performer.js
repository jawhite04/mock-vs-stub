const coupled = require('./services/s3-coupled');
const di = require('./services/s3-di');

const performCoupled = async (/*event, context*/) => {
  const response = await coupled.listObjects('bucket-name');
  return {
    statusCode: 200,
    body: JSON.stringify(response.Contents),
  };
};

const performDi = async (/*event, context*/) => {
  const client = di.getClient();
  const response = await di.listObjects(client, 'bucket-name');
  return {
    statusCode: 200,
    body: JSON.stringify(response.Contents),
  };
};

module.exports = {
  handler: performCoupled,
  performCoupled,
  performDi,
};
