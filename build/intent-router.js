"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const intents_1 = require("./intents");
const Router = require("koa-router");
const router = new Router();
exports.router = router;
router.post('/wizard-cube', (ctx, next) => {
    const body = ctx.request.body;
    ctx.response.body = intents_1.getIntent(body.queryResult.intent.name)(body);
    return next();
});
//# sourceMappingURL=intent-router.js.map