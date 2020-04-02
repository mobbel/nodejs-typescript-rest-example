export interface IRest {
  addCallback: (method: string, slug: string, callback) => void;
  render: (method: string, slug: string, requestBody: IRequestBody) => IResponse;
}

export interface IResponse {
  status: number;
  contentType: string;
  body: string;
}

export interface IRequestBody {
  [key: string]: string;
}

export interface IRegexObject {
  regex: string;
  regexNames: string[];
  callback: (properties: ICallbackProperties) => IResponse;
}

export interface ICallbackProperties {
  requestBody?: IRequestBody;
  slugVariables?: { [key: string]: string };
}

interface IVariablesFromSlug {
  [key: string]: string;
}

const rest = (): IRest => {
  const callbackHolder = {
    delete: [],
    get: [],
    patch: [],
    post: [],
    put: [],
  };
  const regexCallbackHolder = {
    delete: [],
    get: [],
    patch: [],
    post: [],
    put: [],
  };
  const addCallback = (method: string, slug: string, callback): void => {
    if (slug.indexOf('/:') < 0) {
      callbackHolder[method][slug] = callback;
    } else {
      const slugTempArray = [];
      const regexNames = [];
      const slugArray = slug.split('/');
      slugArray.map((slugToTest) => {
        if (slugToTest[0] !== ':') {
          slugTempArray.push(slugToTest);
        } else {
          slugTempArray.push('([a-z0-9]*)');
          regexNames.push(slugToTest.slice(1));
        }
      });
      const regexObject: IRegexObject = {
        callback,
        regexNames,
        regex: `${slugTempArray.join('\/')}`,
      };
      regexCallbackHolder[method].push(regexObject);
    }
  };

  const render = (method: string, slug: string, requestBody: IRequestBody) => {
    let returnCode;
    if (callbackHolder[method][slug]) {
      returnCode = callbackHolder[method][slug]({ requestBody });
    }
    regexCallbackHolder[method].map((methodRegex: IRegexObject) => {
      const matches = slug.match(methodRegex.regex);

      if (matches && matches.length > 0) {
        const variablesFromSlug: IVariablesFromSlug = {};
        methodRegex.regexNames.map((regexName: string, index: number) => {
          variablesFromSlug[regexName] = matches[index + 1];
        });
        returnCode = (methodRegex.callback)({ requestBody, slugVariables: variablesFromSlug });
      }
    });

    return (returnCode);
  };

  return {
    addCallback,
    render,
  };
};

export default rest;
