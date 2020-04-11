import rest, { IRest } from '../../src/rest/rest';

describe('>>> Testing Rest-Module', () => {
  test('+++ Testing if Mobule is basically working', () => {
    const restApp: IRest = rest();
    restApp.addCallback('get', '/test', () => { return true; });

    expect(restApp.render('get', '/test', {}, {})).toBeTruthy();
  });

  test('+++ Creating a Snapshot', () => {
    const restApp: IRest = rest();
    restApp.addCallback('get', '/test', () => {
      return (
        {
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify({ test: 'data' }),
        }
      );
    });

    expect(restApp.render('get', '/test', {}, {})).toMatchSnapshot();
  });
});
