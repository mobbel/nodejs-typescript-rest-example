import { IRest, ICallbackProperties } from '../rest/rest';
import test from '../controller/test';

const getRoutes = (rest: IRest) => {
  rest.addCallback('get', 'test', () => {
    return test().testData();
  });
  rest.addCallback('get', 'test/:id', (properties: ICallbackProperties) => {
    return test().testSlugData(properties);
  });
};

export default getRoutes;
