import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import * as https from 'https';
import {router as intentRouter} from './intent-router';
import * as fs from "fs";
import * as path from "path";

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
    .use(router.allowedMethods());

const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, './../host.key')),
    cert: fs.readFileSync(path.join(__dirname, './../host.cert')),
};
https.createServer(sslOptions, app.callback()).listen(3596);