import express from 'express';
import {
  IncomingMessage,
  ServerResponse,
} from 'http';
import {
  parse,
} from 'url';
import bodyParser from 'body-parser';

import rest, { IRest } from './rest/rest';
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

app
  // we have to handle variables outside ot url parameters
  .use(bodyParser.urlencoded({ extended: false }))
  .use(bodyParser.json())
  .delete('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('delete', slug, req.body));
    res.end();
  })
  .get('*', (req: IncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url);
    const { pathname, query } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('get', slug, parseQueryString(query)));
    res.end();
  })
  .patch('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('patch', slug, req.body));
    res.end();
  })
  .post('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('post', slug, req.body));
    res.end();
  })
  .put('*', (req: INonGetIncomingMessage, res: ServerResponse) => {
    const parsedUrl = parse(req.url, true);
    const { pathname } = parsedUrl;
    const slug = pathname.slice(1);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(restApp.render('put', slug, req.body));
    res.end();
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
