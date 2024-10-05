const calculateProficiencyBonus = async (level) => {
    return Math.floor((level - 1) / 4) + 2;
}

const calculateModifier = async (value)=>{
    return Math.floor((value - 10) / 2);
}

const calculateSavingTM = async (value, isProficient, pb) => {
    const modifier = calculateModifier(value);
    return isProficient ? modifier + pb : modifier;
}

const calculateSkillModifier = async (value, isProficient, isExpert, pb) => {
    const modifier = calculateModifier(value);
    let skillModifier = modifier;
    if (isProficient) skillModifier += pb;
    if (isExpert) skillModifier += pb;
    return skillModifier;

}



module.exports= {
    calculateProficiencyBonus,
    calculateModifier,
    calculateSavingTM,
    calculateSkillModifier
}