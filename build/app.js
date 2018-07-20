"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const intent_router_1 = require("./intent-router");
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
    .listen(process.env.PORT || 3596);
//# sourceMappingURL=app.js.map