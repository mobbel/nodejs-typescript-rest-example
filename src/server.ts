import express from 'express';
import {
  IncomingMessage,
  ServerResponse,
} from 'http';
import {
  parse,
} from 'url';

import rest, { IRest } from './rest/rest';
import getRoutes from './routes/getRoutes';
import bodyParser from 'body-parser';
import parseQueryString from './functions/parseQueryString';

const app = express();
const port = 3000;
const restApp: IRest = rest();

interface INonGetIncomingMessage extends IncomingMessage {
  body?: { [key: string]: string };
}

getRoutes(restApp);

app
  // we have to handle variables outside ot url parameters
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .delete('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('get', slug, req.body));
    res.end;
  })
  .get('*', (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url);
    const { pathname, query } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('get', slug, parseQueryString(query)));
    res.end;
  })
  .patch('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('patch', slug, req.body));
    res.end;
  })
  .post('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('post', slug, req.body));
    res.end;
  })
  .put('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('put', slug, req.body));
    res.end;
  })
  .options('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    res.writeHead(200);
    res.end;
  })
  .listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log('Server listen on Port: ', port);
  });
