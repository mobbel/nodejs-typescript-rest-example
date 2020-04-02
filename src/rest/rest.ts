import {
  IncomingHttpHeaders,
} from 'http';
import auth from './auth';

export interface IRest {
  addCallback: (method: string, slug: string, callback, guarded?: boolean) => void;
  render: (method: string, slug: string, requestBody: IRequestBody, headers: IncomingHttpHeaders) => IResponse;
}

interface IResponseHeader {
  headerKey: string;
  headerValue: string;
}

export interface IResponse {
  status: number;
  contentType: string;
  headers?: IResponseHeader[];
  body?: string;
}

export interface IRequestBody {
  [key: string]: string;
}

export interface ISlugObject {
  guarded: boolean;
  callback: (properties: ICallbackProperties) => IResponse;
}

export interface IRegexObject {
  guarded: boolean;
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
  const addCallback = (method: string, slug: string, callback, guarded: boolean = false): void => {
    if (slug.indexOf('/:') < 0) {
      const slugObject: ISlugObject = {
        guarded,
        callback,
      };
      callbackHolder[method][slug] = slugObject;
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
        guarded,
        callback,
        regexNames,
        regex: `${slugTempArray.join('\/')}`,
      };
      regexCallbackHolder[method].push(regexObject);
    }
  };

  const render = (
    method: string,
    slug: string,
    requestBody: IRequestBody,
    headers?: IncomingHttpHeaders,
  ) => {
    let returnCode: IResponse;
    if (callbackHolder[method][slug]) {
      if (!callbackHolder[method][slug].guarded) {
        returnCode = callbackHolder[method][slug].callback({ requestBody });
      } else if (callbackHolder[method][slug].guarded && auth(headers)) {
        returnCode = callbackHolder[method][slug].callback({ requestBody });
      } else {
        returnCode = {
          status: 401,
          contentType: 'Unauthorized',
          headers: [
            {
              headerKey: 'www-authorization',
              headerValue: 'missing login status',
            },
          ],
        };
      }
    }

    if (typeof returnCode === 'undefined') {
      regexCallbackHolder[method].map((methodRegex: IRegexObject) => {
        const matches = slug.match(methodRegex.regex);
        console.log(matches);
        if (matches && matches.length > 0 && slug === matches[0]) {
          if (!methodRegex.guarded || (methodRegex.guarded && auth(headers))) {
            const variablesFromSlug: IVariablesFromSlug = {};
            methodRegex.regexNames.map((regexName: string, index: number) => {
              variablesFromSlug[regexName] = matches[index + 1];
            });
            returnCode = (methodRegex.callback)({ requestBody, slugVariables: variablesFromSlug });
          } else {
            returnCode = {
              status: 401,
              contentType: 'Unauthorized',
              headers: [
                {
                  headerKey: 'www-authorization',
                  headerValue: 'missing login status',
                },
              ],
            };
          }
        }
      });
    }

    if (typeof returnCode !== 'undefined') {
      return (returnCode);
    }
    return ({
      status: 404,
      contentType: 'text/plain',
    });
  };

  return {
    addCallback,
    render,
  };
};

export default rest;
