"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const spells = [
    {
        id: 'energy beam',
        instructions: 'One target in 90 feet radius makes dexterity saving throw! Did you succeed?',
        action: (success) => {
            return success ? 'Nice, nothing happens! Did anybody fail?' : 'Take 1d8 damage!';
        }
    }
];
function getSpell(name) {
    return spells.filter(s => s.id === name.toLowerCase())[0];
}
exports.getSpell = getSpell;
//# sourceMappingURL=spells.js.map