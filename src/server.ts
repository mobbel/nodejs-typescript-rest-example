import express from 'express';
import {
  IncomingMessage,
  ServerResponse,
} from 'http';
import {
  parse,
} from 'url';
import bodyParser from 'body-parser';

import rest, { IRest, IResponse } from './rest/rest';
import parseQueryString from './functions/parseQueryString';

import getRoutes from './routes/getRoutes';
import postRoutes from './routes/postRoutes';

const app = express();
const port = 3000;
const restApp: IRest = rest();

interface INonGetIncomingMessage extends IncomingMessage {
  body?: { [key: string]: string };
}

getRoutes(restApp);
postRoutes(restApp);

const handle = (type: string, req: INonGetIncomingMessage, res: ServerResponse) => {
  const parsedUrl = parse(req.url, (type === 'get' ? false : true));
  const { pathname } = parsedUrl;
  const properties = type === 'get' ? parseQueryString((parsedUrl.query as string)) : req.body;
  const slug = pathname.slice(1);
  const response: IResponse = restApp.render(type, slug, properties);
  res.writeHead(response.status, { 'Content-Type': response.contentType });
  res.write(response.body);
  res.end();
};

app
  // we have to handle variables outside ot url parameters
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .delete('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    handle('delete', req, res);
  })
  .get('*', (req: IncomingMessage, res: ServerResponse) => {
    handle('get', req, res);
  })
  .patch('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    handle('patch', req, res);
  })
  .post('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    handle('post', req, res);
  })
  .put('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    handle('put', req, res);
  })
  .options('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.end();
  })
  .listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log('Server listen on Port: ', port);
  });
