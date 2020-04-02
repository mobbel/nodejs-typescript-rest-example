import { IRest, ICallbackProperties, IResponse } from '../rest/rest';
import test from '../controller/test';

const getRoutes = (rest: IRest) => {
  rest.addCallback('get', 'test', (): IResponse => {
    return test().testData();
  });
  rest.addCallback('get', 'test/:id', (properties: ICallbackProperties): IResponse => {
    return test().testSlugData(properties);
  });
  rest.addCallback('get', 'test/guarded', (): IResponse => {
    return test().testData();
  },               true);
};

export default getRoutes;
