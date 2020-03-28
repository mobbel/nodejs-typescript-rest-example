import { IRest } from '../rest/rest';
import test from '../controller/test';

const getRoutes = (rest: IRest) => {
  rest.get('test', () => {
    return test().testData();
  });
};

export default getRoutes;
