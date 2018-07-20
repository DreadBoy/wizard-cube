"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers = [
    {
        id: 'projects/wizard-cube/agent/intents/c39f7618-a6d0-40c1-833d-e080cf1b9665',
        handler: () => {
            return {
                fulfillmentText: 'Welcome to Book of Arcane knowledge! Cast spells, roll dice and enjoy! ',
            };
        }
    },
];
function getIntent(id) {
    return handlers.filter(h => h.id === id)[0].handler;
}
exports.getIntent = getIntent;
//# sourceMappingURL=intents.js.map