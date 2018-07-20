"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spells_1 = require("./spells");
function random(from, to) {
    return Math.floor(Math.random() * to) + from;
}
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
            const sum = new Array(number).fill(0).map(() => random(1, die)).reduce((acc, curr) => acc + curr, 0) + modifier;
            const sentiment = sum === number * die + modifier ? ` Holly shit, natural!` : sum === 1 ? ` Fuck!` : '';
            return {
                fulfillmentText: `Rolling ${number} d ${die} ${modifier > 0 ? `plus ${modifier} ` : ''}for sum of ${sum}!${sentiment}`,
            };
        }
    },
    {
        id: 'projects/wizard-cube/agent/intents/4b708ea9-bdf6-4682-9bf6-bcd156a486c1',
        handler: (parameters) => {
            const { spell } = parameters;
            // let {level} = parameters;
            // level = level || 1;
            const Spell = spells_1.getSpell(spell);
            if (!Spell)
                return {
                    fulfillmentText: 'I\'ve never heard of that!',
                };
            return {
                fulfillmentText: Spell.instructions,
            };
        }
    },
    {
        id: 'projects/wizard-cube/agent/intents/7b3ffb8c-0f51-4fc1-9c3b-eafc1c200a43',
        handler: (parameters, contexts) => {
            const { spell } = contexts[0].parameters;
            if (!spell)
                return {
                    fulfillmentText: 'I forgot what spell was cast, my bad.',
                };
            const Spell = spells_1.getSpell(spell);
            if (!Spell)
                return {
                    fulfillmentText: 'I forgot what spell was cast, my bad.',
                };
            return {
                fulfillmentText: Spell.action(false),
            };
        }
    },
    {
        id: 'projects/wizard-cube/agent/intents/045f5409-393a-44f3-989d-280007c0f541',
        handler: (parameters, contexts) => {
            const { spell } = contexts[0].parameters;
            if (!spell)
                return {
                    fulfillmentText: 'I forgot what spell was cast, my bad.',
                };
            const Spell = spells_1.getSpell(spell);
            if (!Spell)
                return {
                    fulfillmentText: 'I forgot what spell was cast, my bad.',
                };
            return {
                fulfillmentText: Spell.action(true),
            };
        }
    },
];
function getIntent(id) {
    return handlers.filter(h => h.id === id)[0].handler;
}
exports.getIntent = getIntent;
//# sourceMappingURL=intents.js.map