import * as testController from '../../src/controller/test';

describe('>>> Testing test-controller', () => {
  test('+++ Testing testData-function', () => {
    const result = testController.default().testData();
    const expectedData = {
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ test: 'data' }),
    };

    expect(result).toStrictEqual(expectedData);
  });

  test('+++ Testing testPostData-function', () => {
    const result = testController.default().testPostData({
      requestBody: {
        test: 'testValueBuild',
      },
    });
    const expectedData = {
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        postData: {
          test: 'testValueBuild',
        },
      }),
    };

    expect(result).toStrictEqual(expectedData);
  });

  test('+++ Testing testSlugData-function', () => {
    const result = testController.default().testSlugData({
      slugVariables: {
        id: 'testSlug',
      },
    });
    const expectedData = {
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        slugData: {
          id: 'testSlug',
        },
      }),
    };

    expect(result).toStrictEqual(expectedData);
  });
});
