import { IRequestBody } from '../rest/rest';

const test = () => {
  const testData = () => {
    return (JSON.stringify({ test: 'data' }));
  };

  const testPostData = (requestBody: IRequestBody) => {
    console.log('Controller requestBody: ', requestBody);

    return (JSON.stringify({ postData: requestBody }));
  };

  return {
    testData,
    testPostData,
  };
};

export default test;
