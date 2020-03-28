interface IParseQueryString {
  [key: string]: string;
}

const parseQueryString = (query: string): IParseQueryString => {
  let queryString = query;
  const queryObject = {};

  if (!queryString) {
    return;
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
