import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import {FulfillmentRequest} from "./types";
import {getIntent} from "./intents";

const app = new Koa();
const router = new Router();

router.get('/', (ctx: Koa.Context, next: Function) => {
    ctx.response.body = 'Welcome to Book of Arcane Knowledge!';
    return next();
});

router.post('/', (ctx: Koa.Context, next: Function) => {
    const body = ctx.request.body as FulfillmentRequest;
    ctx.response.body = getIntent(body.queryResult.intent.name)(body);
    return next();
});

app
    .use(bodyParser())
    .use(router.routes())
    .use(router.allowedMethods())
    .listen(3596);