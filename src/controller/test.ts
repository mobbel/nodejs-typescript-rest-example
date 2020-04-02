import {
  ICallbackProperties, IResponse,
} from '../rest/rest';

const test = () => {
  const testData = (): IResponse => {
    return ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ test: 'data' }),
    });
  };

  const testPostData = (properties: ICallbackProperties): IResponse => {
    return ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ postData: properties.requestBody }),
    });
  };

  const testSlugData = (properties: ICallbackProperties): IResponse => {
    return ({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ slugData: properties.slugVariables }),
    });
  };

  return {
    testData,
    testPostData,
    testSlugData,
  };
};

export default test;
