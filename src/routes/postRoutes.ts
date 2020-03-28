import { IRest, IRequestBody } from '../rest/rest';
import test from '../controller/test';

const postRoutes = (rest: IRest) => {
  rest.post('test', (requestBody: IRequestBody) => {
    return test().testPostData(requestBody);
  });
};

export default postRoutes;
