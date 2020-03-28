import express from 'express';
import {
  IncomingMessage,
  ServerResponse,
} from 'http';
import {
  parse,
} from 'url';

import rest from './rest/rest';
import getRoutes from './routes/getRoutes';

const app = express();
const port = 3000;
const restApp = rest();

getRoutes(restApp);

app
  .delete('*', (req: IncomingMessage, res: ServerResponse) => {})
  .get('*', (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('get', slug));
    res.end;
  })
  .patch('*', (req: IncomingMessage, res: ServerResponse) => {})
  .post('*', (req: IncomingMessage, res: ServerResponse) => {})
  .put('*', (req: IncomingMessage, res: ServerResponse) => {})
  .options('*', (req: IncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.end;
  })
  .listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log('Server listen on Port: ', port);
  });
