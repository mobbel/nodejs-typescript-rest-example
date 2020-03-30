import {
  IRest,
  ICallbackProperties,
} from '../rest/rest';
import test from '../controller/test';

const postRoutes = (rest: IRest) => {
  rest.addCallback('post', 'test', (properties: ICallbackProperties) => {
    return test().testPostData(properties);
  });
};

export default postRoutes;
