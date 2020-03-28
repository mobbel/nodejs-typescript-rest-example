export interface IRest {
  get: (slug: string, callback) => void;
  post: (slug: string, callback) => void;
  render: (method: string, slug: string, requestBody: IRequestBody) => string;
}

export interface IRequestBody {
  [key: string]: string;
}

const rest = (): IRest => {
  const callbackHolder = {
    get: [],
    post: [],
  };
  const get = (slug: string, callback): void => {
    callbackHolder.get[slug] = callback;
  };
  const post = (slug: string, callback): void => {
    callbackHolder.post[slug] = callback;
  };

  const render = (method: string, slug: string, requestBody: IRequestBody) => {
    console.log('requestBody: ', requestBody);

    return callbackHolder[method][slug](requestBody);
  };

  return {
    get,
    post,
    render,
  };
};

export default rest;
