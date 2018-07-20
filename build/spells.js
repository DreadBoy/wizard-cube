"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spells = [
    {
        id: 'energy beam',
        instructions: 'Everybody in 90 feet radius make dexterity saving throw!',
        action: (success) => {
            return success ? 'Nice, nothing happens!' : 'Take 1d8 damage!';
        }
    }
];
function getSpell(name) {
    return spells.filter(s => s.id === name.toLowerCase())[0];
}
exports.getSpell = getSpell;
//# sourceMappingURL=spells.js.map