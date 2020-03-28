export interface IRest {
  get: (slug: string, callback) => void;
  render: (method: string, slug: string) => any;
}

const rest = (): IRest => {
  const callbackHolder = {
    get: [],
  };
  const get = (slug: string, callback): void => {
    callbackHolder.get[slug] = callback;
  };

  const render = (method: string, slug: string) => {
    return callbackHolder[method][slug]();
  };

  return {
    get,
    render,
  };
};

export default rest;
