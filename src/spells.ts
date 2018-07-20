const spells = [
    {
        id: 'energy beam',
        instructions: 'Everybody in 90 feet radius make dexterity saving throw! Did you succeeded?',
        action: (success: boolean) => {
            return success ? 'Nice, nothing happens!' : 'Take 1d8 damage!'
        }
    }
];

export function getSpell(name: string) {
    return spells.filter(s => s.id === name.toLowerCase())[0];
}