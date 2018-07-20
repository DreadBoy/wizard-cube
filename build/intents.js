"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handlers = [
    {
        id: 'projects/wizard-cube/agent/intents/c39f7618-a6d0-40c1-833d-e080cf1b9665',
        handler: () => {
            return {
                fulfillmentText: 'Welcome to Book of Arcane knowledge! Cast spells, roll dice and enjoy!',
            };
        }
    },
    {
        id: 'projects/wizard-cube/agent/intents/38b83d78-9372-41b5-b18e-90b5cbd802c0',
        handler: (parameters) => {
            const { number, die } = parameters;
            let { modifier } = parameters;
            if (!number)
                return {
                    fulfillmentText: 'I didn\'t catch number of dice, repeat, please!',
                };
            if (!die)
                return {
                    fulfillmentText: 'I didn\'t catch a die, repeat, please!',
                };
            modifier = modifier || 0;
            const sum = new Array(number).fill(0).map(() => Math.floor(Math.random() * die)).reduce((acc, curr) => acc + curr, 0) + modifier;
            const sentiment = sum === number * die + modifier ? ` Holly shit, natural 20!` : sum === 1 ? ` Fuck!` : '';
            return {
                fulfillmentText: `Rolling ${number} d ${die} ${modifier > 0 ? `plus ${modifier} ` : ''} for sum of ${sum}!${sentiment}`,
            };
        }
    },
];
function getIntent(id) {
    return handlers.filter(h => h.id === id)[0].handler;
}
exports.getIntent = getIntent;
//# sourceMappingURL=intents.js.map