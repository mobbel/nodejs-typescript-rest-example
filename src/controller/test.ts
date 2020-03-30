import {
  ICallbackProperties,
} from '../rest/rest';

const test = () => {
  const testData = () => {
    return (JSON.stringify({ test: 'data' }));
  };

  const testPostData = (properties: ICallbackProperties) => {
    return (JSON.stringify({ postData: properties.requestBody }));
  };

  const testSlugData = (properties: ICallbackProperties) => {
    return (JSON.stringify({ slugData: properties.slugVariables }));
  };

  return {
    testData,
    testPostData,
    testSlugData,
  };
};

export default test;
