import parseQueryString from '../../src/functions/parseQueryString';

describe('>>> Testing parseQueryString-function', () => {
  test('+++ Test function with Query-String', () => {
    const queryObject = parseQueryString('?id=12345');
    const expectedData = {
      id: '12345',
    };

    expect(queryObject).toEqual(expectedData);
  });

  test('+++ Test function without Query-String', () => {
    const queryObject = parseQueryString();
    const expectedData = {};

    expect(queryObject).toEqual(expectedData);
  });
});
