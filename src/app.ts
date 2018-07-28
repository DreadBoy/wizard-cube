import * as Koa from 'koa';
import * as enforceHttps from 'koa-sslify';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as http from 'http';
import * as https from 'https';
import {router as intentRouter} from './intent-router';
import * as fs from "fs";

const app = new Koa();
const router = new Router();

router.get('/', (ctx: Koa.Context, next: Function) => {
    ctx.response.body = 'Welcome to Book of Arcane Knowledge!';
    return next();
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(intentRouter.routes())
    .use(router.allowedMethods())
    .use(enforceHttps({}));

const sslOptions = {
    key: fs.readFileSync('./../host.key'),
    cert: fs.readFileSync('./../host.cert'),
};
http.createServer(app.callback()).listen(80);
https.createServer(sslOptions, app.callback()).listen(443);