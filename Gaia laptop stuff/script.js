// Get the input element and proficiency bonus display element
const levelInput = document.getElementById('inlevel');
const ppb = document.getElementById('ppb'); // Changed from pbDisplay to ppb

// Function to calculate proficiency bonus based on level
function calculateProficiencyBonus(level) {
    return Math.ceil(level / 4) + 1; // Calculate proficiency bonus
}

// Function to calculate ability modifier
function calculateModifier(value) {
    return Math.floor((value - 10) / 2);
}

// Function to update modifiers
function updateModifiers() {
    const attributes = [
        { id: 'bstr', modId: 'strMod' },
        { id: 'bdex', modId: 'dexMod' },
        { id: 'bcon', modId: 'conMod' },
        { id: 'bint', modId: 'intMod' },
        { id: 'bwis', modId: 'wisMod' },
        { id: 'bcha', modId: 'chaMod' }
    ];

    attributes.forEach(attr => {
        const inputValue = parseInt(document.getElementById(attr.id).value, 10);
        if (!isNaN(inputValue)) {
            const modifier = calculateModifier(inputValue);
            document.getElementById(attr.modId).textContent = (modifier >= 0 ? `+${modifier}` : modifier); // Format the modifier
        }
    });
}

// Function to update saving throw modifiers
function updateSavingThrows() {
    const proficiencyBonus = calculateProficiencyBonus(parseInt(levelInput.value, 10)); // Calculate proficiency bonus
    ppb.textContent = proficiencyBonus; // Update proficiency bonus display
    const savingThrows = [
        { stat: 'bstr', pfId: 'strPF', modId: 'strSF' },
        { stat: 'bdex', pfId: 'dexPF', modId: 'dexSF' },
        { stat: 'bcon', pfId: 'conPF', modId: 'conSF' },
        { stat: 'bint', pfId: 'intPF', modId: 'intSF' },
        { stat: 'bwis', pfId: 'wisPF', modId: 'wisSF' },
        { stat: 'bcha', pfId: 'chaPF', modId: 'chaSF' }
    ];

    savingThrows.forEach(savingThrow => {
        const abilityScore = parseInt(document.getElementById(savingThrow.stat).value, 10);
        const abilityModifier = calculateModifier(abilityScore); // Calculate ability modifier
        let savingThrowModifier = abilityModifier; // Start with the ability modifier

        // Check if proficiency is applied
        const isProficient = document.getElementById(savingThrow.pfId).checked;
        if (isProficient) {
            savingThrowModifier += proficiencyBonus; // Add proficiency bonus if checked
        }

        // Update the display for the saving throw modifier (using SF suffix)
        document.getElementById(savingThrow.modId).textContent = (savingThrowModifier >= 0 ? `+${savingThrowModifier}` : savingThrowModifier); // Format the modifier
    });
}

// Function to update skill modifiers
function updateSkills() {
    const proficiencyBonus = calculateProficiencyBonus(parseInt(levelInput.value, 10)); // Calculate proficiency bonus

    const skills = [
        { name: 'acro', ability: 'bstr', modId: 'acroMod' }, // Acrobatics uses Strength
        { name: 'anima', ability: 'bcha', modId: 'animMod' }, // Animal Handling uses Charisma
        { name: 'arca', ability: 'bint', modId: 'arcaMod' }, // Arcana uses Intelligence
        { name: 'athl', ability: 'bstr', modId: 'athlMod' }, // Athletics uses Strength
        { name: 'dece', ability: 'bcha', modId: 'deceMod' }, // Deception uses Charisma
        { name: 'hist', ability: 'bint', modId: 'histMod' }, // History uses Intelligence
        { name: 'insi', ability: 'bwis', modId: 'insiMod' }, // Insight uses Wisdom
        { name: 'inti', ability: 'bcha', modId: 'intiMod' }, // Intimidation uses Charisma
        { name: 'inve', ability: 'bint', modId: 'inveMod' }, // Investigation uses Intelligence
        { name: 'medi', ability: 'bwis', modId: 'mediMod' }, // Medicine uses Wisdom
        { name: 'natu', ability: 'bwis', modId: 'natuMod' }, // Nature uses Wisdom
        { name: 'perc', ability: 'bwis', modId: 'percMod' }, // Perception uses Wisdom
        { name: 'perf', ability: 'bcha', modId: 'perfMod' }, // Performance uses Charisma
        { name: 'pers', ability: 'bcha', modId: 'persMod' }, // Persuasion uses Charisma
        { name: 'reli', ability: 'bint', modId: 'reliMod' }, // Religion uses Intelligence
        { name: 'slei', ability: 'bdex', modId: 'sleiMod' }, // Sleight of Hand uses Dexterity
        { name: 'steal', ability: 'bdex', modId: 'stealMod' }, // Stealth uses Dexterity
        { name: 'surv', ability: 'bwis', modId: 'survMod' } // Survival uses Wisdom
    ];

    skills.forEach(skill => {
        const abilityScore = parseInt(document.getElementById(skill.ability).value, 10); // Use corresponding ability score
        const abilityModifier = calculateModifier(abilityScore); // Calculate ability modifier
        let skillModifier = abilityModifier; // Start with the ability modifier

        // Check if proficiency is applied
        const isProficient = document.getElementById(skill.name + 'PF').checked;
        if (isProficient) {
            skillModifier += proficiencyBonus; // Add proficiency bonus if PF is checked
        }

        // Check if expertise is applied
        const isExpert = document.getElementById(skill.name + 'EX').checked;
        if (isExpert) {
            skillModifier += proficiencyBonus; // Add proficiency bonus again if EX is checked
        }

        // Update the display for the skill modifier
        document.getElementById(skill.modId).textContent = (skillModifier >= 0 ? `+${skillModifier}` : skillModifier); // Format the modifier
    });
}

// Add event listeners for the input events
levelInput.addEventListener('input', function() {
    const newValue = parseInt(levelInput.value, 10);
    // Check if the new value is a valid number
    if (!isNaN(newValue) && newValue > 0) {
        const proficiencyBonus = calculateProficiencyBonus(newValue);
        ppb.textContent = proficiencyBonus; // Update proficiency bonus display
        console.log('Level updated to:', newValue);
        updateSavingThrows(); // Update saving throws when level changes
        updateSkills(); // Update skills when level changes
    }
});

// Add event listeners to each attribute input
const attributeInputs = ['bstr', 'bdex', 'bcon', 'bint', 'bwis', 'bcha'];
attributeInputs.forEach(id => {
    document.getElementById(id).addEventListener('input', () => {
        updateModifiers();
        updateSavingThrows(); // Update saving throws when ability scores change
        updateSkills(); // Update skills when ability scores change
    });
});

// Add event listeners to each saving throw checkbox
const savingThrowInputs = ['strPF', 'dexPF', 'conPF', 'intPF', 'wisPF', 'chaPF'];
savingThrowInputs.forEach(id => {
    document.getElementById(id).addEventListener('change', updateSavingThrows);
});

// Add event listeners to each skill checkbox
const skillCheckboxes = [
    'acroEX', 'acroPF', 
    'animaEX', 'animaPF', 
    'arcaEX', 'arcaPF', 
    'athlEX', 'athlPF', 
    'deceEX', 'decePF', 
    'histEX', 'histPF', 
    'insiEX', 'insiPF', 
    'intiEX', 'intiPF', 
    'inveEX', 'invePF', 
    'mediEX', 'mediPF', 
    'natuEX', 'natuPF', 
    'percEX', 'percPF', 
    'perfEX', 'perfPF', 
    'persEX', 'persPF', 
    'reliEX', 'reliPF', 
    'sleiEX', 'sleiPF', 
    'stealEX', 'stealPF', 
    'survEX', 'survPF'
];
skillCheckboxes.forEach(id => {
    document.getElementById(id).addEventListener('change', updateSkills);
});

// Initialize modifiers and proficiency bonus on page load
updateModifiers();
updateSavingThrows();
updateSkills();
