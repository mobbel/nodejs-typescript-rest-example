import rest, { IRest } from '../../src/rest/rest';
import postRoutes from '../../src/routes/postRoutes';

describe('>>> Testing Post-Routes', () => {
  const restApp: IRest = rest();
  postRoutes(restApp);

  test('+++ Snapshot of /test without body-content', () => {
    expect(restApp.render('post', 'test', {}, {})).toMatchSnapshot();
  });

  test('+++ Snapshot of /test with body-content', () => {
    expect(restApp.render(
      'post',
      'test',
      {
        test: 'data',
      },
      {},
      )).toMatchSnapshot();
  });
});
