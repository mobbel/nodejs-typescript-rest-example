interface IParseQueryString {
  [key: string]: string;
}

const parseQueryString = (query: string = null): IParseQueryString => {
  let queryString = query;
  const queryObject = {};

  if (!queryString) {
    return queryObject;
  }

  if (queryString.indexOf('?') === 0) {
    queryString = queryString.slice(1);
  }

  queryString.split('&').forEach((queryPart) => {
    const queryPartArray = queryPart.split('=');
    queryObject[queryPartArray[0]] = queryPartArray[1];
  });

  return queryObject;
};

export default parseQueryString;
