"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const enforceHttps = require("koa-sslify");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const http = require("http");
const https = require("https");
const intent_router_1 = require("./intent-router");
const fs = require("fs");
const app = new Koa();
const router = new Router();
router.get('/', (ctx, next) => {
    ctx.response.body = 'Welcome to Book of Arcane Knowledge!';
    return next();
});
app
    .use(bodyParser())
    .use(router.routes())
    .use(intent_router_1.router.routes())
    .use(router.allowedMethods())
    .use(enforceHttps({}));
const sslOptions = {
    key: fs.readFileSync('./../host.key'),
    cert: fs.readFileSync('./../host.cert'),
};
http.createServer(app.callback()).listen(80);
https.createServer(sslOptions, app.callback()).listen(443);
//# sourceMappingURL=app.js.map