import {FulfillmentRequest, FulfillmentResponse, OutputContext} from './types';
import {getSpell} from './spells';

function random(from: number, to: number) {
    return Math.floor(Math.random() * to) + from;
}

interface Handler {
    id: string;
    handler: (body: FulfillmentRequest) => FulfillmentResponse;
}

const handlers: Handler[] = [
    {
        id: 'projects/wizard-cube/agent/intents/c39f7618-a6d0-40c1-833d-e080cf1b9665',
        handler: (): FulfillmentResponse => {
            return {
                fulfillmentText: 'Welcome to Book of Arcane knowledge! Cast spells, roll dice and enjoy!',
            };
        }
    },
    {
        id: 'projects/wizard-cube/agent/intents/38b83d78-9372-41b5-b18e-90b5cbd802c0',
        handler: (body): FulfillmentResponse => {
            const {parameters} = body.queryResult;
            const {number, die} = parameters;
            let {modifier} = parameters;
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
        handler: (body): FulfillmentResponse => {
            const {parameters} = body.queryResult;
            const {spell} = parameters;
            const Spell = getSpell(spell);
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
        handler: (body): FulfillmentResponse => {
            const context = body.queryResult.outputContexts.filter(c => c.name === `${body.session}/contexts/cast-spell`)[0];
            if (!context)
                return {
                    fulfillmentText: 'I forgot what spell are we talking about.',
                };
            const {spell} = context.parameters;
            const Spell = getSpell(spell);
            if (!Spell)
                return {
                    fulfillmentText: 'I forgot what spell are we talking about.',
                };
            let {result} = body.queryResult.parameters;
            result = result === 'yes';
            return {
                fulfillmentText: Spell.action(result),
            };
        }
    },
];

export function getIntent(id: string) {
    return handlers.filter(h => h.id === id)[0].handler;
}