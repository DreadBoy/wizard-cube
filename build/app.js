"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const https = require("https");
const intent_router_1 = require("./intent-router");
const fs = require("fs");
const path = require("path");
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
    .use(router.allowedMethods());
const sslOptions = {
    key: fs.readFileSync(path.join(__dirname, './../host.key')),
    cert: fs.readFileSync(path.join(__dirname, './../host.cert')),
};
https.createServer(sslOptions, app.callback()).listen(3596);
//# sourceMappingURL=app.js.map