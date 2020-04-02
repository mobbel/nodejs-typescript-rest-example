import {
  IncomingHttpHeaders,
} from 'http';

const auth = (headers: IncomingHttpHeaders) => {
  if (headers && headers.authorization) {
    // implement here your authorizsation check
    return true;
  }
  return false;
};

export default (auth);
