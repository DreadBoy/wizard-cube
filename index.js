const Koa = require('koa');
const app = module.exports = new Koa();

app.use(async function(ctx) {
  ctx.body = 'Welcome to Book of knowledge!';
});

if (!module.parent) app.listen(3596);