"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spells_1 = require("./spells");
function random(from, to) {
    return Math.floor(Math.random() * to) + from;
}
const filterProfanity = true;
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
        handler: (body) => {
            const { parameters } = body.queryResult;
            const { number, sign } = parameters;
            let { modifier } = parameters;
            const die = parseInt(parameters.die.slice(1)); // Die comes as D8, not only number
            if (!number)
                return {
                    fulfillmentText: 'How many dice was it?',
                };
            if (!die)
                return {
                    fulfillmentText: 'What die was it?',
                };
            modifier = modifier || 0;
            const baseSum = new Array(number).fill(0).map(() => random(1, die)).reduce((acc, curr) => acc + curr, 0);
            let sum = baseSum;
            let modifierText = '';
            if (modifier > 0 && (sign === 'plus' || sign === 'minus')) {
                modifierText = `${sign} ${modifier} `;
                if (sign === 'plus')
                    sum += modifier;
                else if (sign === 'minus')
                    sum -= modifier;
            }
            let sentiment = '';
            if (baseSum === number * 1)
                sentiment = filterProfanity ? ' Dang!' : ' Fuck!';
            if (baseSum === number * die)
                if (die === 20)
                    sentiment = filterProfanity ? 'Nice, natural!' : ' Holly shit, natural!';
                else
                    sentiment = filterProfanity ? 'Nice, max!' : ' Holly shit, max!';
            return {
                fulfillmentText: `Rolling ${number} d ${die} ${modifierText}for sum of ${sum}!${sentiment}`,
            };
        }
    },
    {
        id: 'projects/wizard-cube/agent/intents/4b708ea9-bdf6-4682-9bf6-bcd156a486c1',
        handler: (body) => {
            const { parameters } = body.queryResult;
            const { spell } = parameters;
            const Spell = spells_1.getSpell(spell);
            if (!Spell)
                return {
                    fulfillmentText: 'I\'ve never heard of that!',
                };
            return {
                fulfillmentText: Spell.instructions,
                outputContexts: [
                    {
                        name: `${body.session}/contexts/cast-spell`,
                        parameters: {
                            spell,
                        },
                        lifespanCount: 5
                    }
                ]
            };
        }
    },
    {
        id: 'projects/wizard-cube/agent/intents/3f7a7d8a-dbb3-4b5a-836d-1470fcb2c005',
        handler: (body) => {
            const context = body.queryResult.outputContexts.filter(c => c.name === `${body.session}/contexts/cast-spell`)[0];
            if (!context)
                return {
                    fulfillmentText: 'I forgot what spell are we talking about.',
                };
            const { spell } = context.parameters;
            const Spell = spells_1.getSpell(spell);
            if (!Spell)
                return {
                    fulfillmentText: 'I forgot what spell are we talking about.',
                };
            let { result } = body.queryResult.parameters;
            result = result === 'yes';
            return {
                fulfillmentText: Spell.action(result),
            };
        }
    },
];
function getIntent(id) {
    return handlers.filter(h => h.id === id)[0].handler;
}
exports.getIntent = getIntent;
//# sourceMappingURL=intents.js.map