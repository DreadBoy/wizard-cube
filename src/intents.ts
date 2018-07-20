import {FulfillmentResponse} from './types';

const handlers = [
    {
        id: 'projects/wizard-cube/agent/intents/c39f7618-a6d0-40c1-833d-e080cf1b9665',
        handler: (): FulfillmentResponse => {
            return {
                fulfillmentText: 'Welcome to Book of Arcane knowledge! Cast spells, roll dice and enjoy!',
            };
        }
    },
];

export function getIntent(id: string) {
    return handlers.filter(h => h.id === id)[0].handler;
}