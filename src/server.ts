import http, {
  IncomingMessage,
  ServerResponse,
} from 'http';
import https from 'https';
import {
  parse,
} from 'url';
import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';

import rest, { IRest, IResponse } from './rest/rest';
import parseQueryString from './functions/parseQueryString';

import getRoutes from './routes/getRoutes';
import postRoutes from './routes/postRoutes';

const app = express();
const port = 3000;
const sslPort = 3030;
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
  const response: IResponse = restApp.render(type, slug, properties, req.headers);
  if (response.headers && response.headers.length > 0) {
    response.headers.map((header) => {
      res.setHeader(header.headerKey, header.headerValue);
    });
  }
  res.writeHead(response.status, { 'Content-Type': response.contentType });
  if (response.body) {
    res.write(response.body);
  }
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
  });

http.createServer(app)
  .listen(port, () => {
    console.log('Server listen on Port: ', port);
  });

// now we use https instead of http
https.createServer({
  key: fs.readFileSync(`${__dirname}/../ssl_key/key.pem`),
  cert: fs.readFileSync(`${__dirname}/../ssl_key/cert.pem`),
  passphrase: '',
},                 app)
  .listen(sslPort, () => {
    console.log('SSL-Server listen on Port: ', sslPort);
  });
