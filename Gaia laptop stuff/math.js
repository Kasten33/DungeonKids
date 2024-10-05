export function calculateProficiencyBonus(level) {
    return Math.floor((level - 1) / 4) + 2;
}

export function calculateModifier(value) {
    return Math.floor((value - 10) / 2);
}

export function calculateSavingThrowModifier(value, isProficient, pb) {
    const modifier = calculateModifier(value);
    return isProficient ? modifier + pb : modifier;
}

export function calculateSkillModifier(value, isProficient, isExpert, pb) {
    const modifier = calculateModifier(value);
    let skillModifier = modifier;
    if (isProficient) skillModifier += pb;
    if (isExpert) skillModifier += pb;
    return skillModifier;
}

