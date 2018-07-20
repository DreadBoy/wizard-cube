const spells = [
    {
        id: 'energy beam',
        instructions: 'One target in 90 feet radius makes dexterity saving throw! Did you succeed?',
        action: (success: boolean) => {
            return success ? 'Nice, nothing happens! Did anybody fail?' : 'Take 1d8 damage!'
        }
    }
];

export function getSpell(name: string) {
    return spells.filter(s => s.id === name.toLowerCase())[0];
}