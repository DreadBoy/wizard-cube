import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
import {router as intentRouter} from './intent-router';

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
    .listen(process.env.PORT || 3596);