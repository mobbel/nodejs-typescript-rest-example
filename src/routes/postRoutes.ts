import {
  IRest,
  ICallbackProperties,
  IResponse,
} from '../rest/rest';
import test from '../controller/test';

const postRoutes = (rest: IRest) => {
  rest.addCallback('post', 'test', (properties: ICallbackProperties): IResponse => {
    return test().testPostData(properties);
  });
};

export default postRoutes;
