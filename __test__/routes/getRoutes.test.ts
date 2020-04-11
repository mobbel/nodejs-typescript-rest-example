import rest, { IRest } from '../../src/rest/rest';
import getRoutes from '../../src/routes/getRoutes';

describe('>>> Testing Get-Routes', () => {
  const restApp: IRest = rest();
  getRoutes(restApp);

  test('+++ Snapshot of /test route', () => {
    expect(restApp.render('get', 'test', {}, {})).toMatchSnapshot();
  });

  test('+++ Snapshot of /test/:id route', () => {
    expect(restApp.render('get', 'test/12345', {}, {})).toMatchSnapshot();
  });

  test('+++ Snapshot of /test/guarded fail', () => {
    expect(restApp.render('get', 'test/guarded', {}, {})).toMatchSnapshot();
  });

  test('+++ Snapshot of /test/guarded work', () => {
    expect(restApp.render('get', 'test/guarded', {}, {
      authorization: 'test',
    })).toMatchSnapshot();
  });
});
