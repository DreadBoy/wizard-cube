"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const intents_1 = require("./intents");
const app = new Koa();
const router = new Router();
router.get('/', (ctx, next) => {
    ctx.response.body = 'Welcome to Book of Arcane Knowledge!';
    return next();
});
router.post('/', (ctx, next) => {
    const body = ctx.request.body;
    ctx.response.body = intents_1.getIntent(body.queryResult.intent.name)(body);
    return next();
});
app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3596);
//# sourceMappingURL=app.js.map