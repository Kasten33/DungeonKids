"use strict";

// Import necessary utility functions from math.js
import { 
    calculateProficiencyBonus, 
    calculateModifier, 
    calculateSavingThrowModifier, 
    calculateSkillModifier
} from './math.js';

// Global variable to store character data and weapon data
let characterData = {};
let weaponData = [];

// Fetch and populate initial data
async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function initializeData() {
    try {
        characterData = await fetchData('data.json');
        console.log('Initial data:', characterData);
        populateFields(characterData);
        initializeModifiersAndSkills();

        const weaponResponse = await fetchData('weapons.json');
        weaponData = weaponResponse.weapons;
        console.log('Weapon data loaded:', weaponData);

        // Add event listeners to stat input fields
        const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
        stats.forEach(stat => {
            const element = document.querySelector(`input[name="${stat}"]`);
            if (element) {
                element.addEventListener('input', (event) => {
                    updateModifier(stat, event.target.value);
                    updateAllSavingThrows();
                    updateAllSkills();
                });
            }
        });
    } catch (error) {
        console.error('Error loading JSON:', error);
    }
}

// Populate input fields with character data
function populateFields(data) {
    populateGeneralFields(data);
    populateModifiers(data);
    populateSavingThrows(data);
    populateSkills(data);
    populateHealthStats(data);
    updateProficiencyBonus(data.level);
    updateAllModifiers();
    updateAllSavingThrows();
    updateAllSkills();
}

function populateGeneralFields(data) {
    const fields = [
        { name: 'level', value: data.level || 1 },
        { name: 'class', value: data.class || 'Rogue' },
        { name: 'subclass', value: data.subclass || '' },
        { name: 'race', value: data.race || 'Dwarf' },
        { name: 'subrace', value: data.subrace || '' },
        { name: 'background', value: data.background || '' } // Added background field
    ];

    fields.forEach(field => {
        const element = document.querySelector(`input[name="${field.name}"], select[name="${field.name}"]`);
        if (element) {
            element.value = field.value;
        } else {
            console.error(`Element with name "${field.name}" not found`);
        }
    });

    const defaultStatValue = 10;
    const stats = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    stats.forEach(stat => {
        const element = document.querySelector(`input[name="${stat}"]`);
        if (element) {
            element.value = data.stats?.[stat] || defaultStatValue;
        } else {
            console.error(`Element with name "${stat}" not found`);
        }
    });

    const proficiencyBonus = calculateProficiencyBonus(data.level);
    const proficiencyBonusElement = document.getElementById('proficiency-bonus');
    if (proficiencyBonusElement) {
        proficiencyBonusElement.textContent = proficiencyBonus;
    } else {
        console.error('Element with ID "proficiency-bonus" not found');
    }
}

function populateModifiers(data) {
    const modifiers = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    modifiers.forEach(modifier => {
        const elementId = `${modifier}M`;
        const modifierValue = calculateModifier(data.stats?.[modifier] || 10);
        updateModifierDOM(elementId, modifierValue);
    });
}

function populateSavingThrows(data) {
    const savingThrows = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    savingThrows.forEach(attr => {
        const element = document.getElementById(`${attr}PF`);
        if (element) {
            element.checked = data.savingThrows?.[attr] || false;
        } else {
            console.error(`Element with ID ${attr}PF not found`);
        }
    });
}

function populateSkills(data) {
    const skills = Object.keys(data.skills);
    skills.forEach(skill => {
        const skillData = data.skills[skill];
        const expertiseElement = document.getElementById(`${skill.substring(0, 4)}EX`);
        if (expertiseElement) {
            expertiseElement.checked = skillData.expertise || false;
        } else {
            console.error(`Element with ID ${skill.substring(0, 4)}EX not found`);
        }

        const proficiencyElement = document.getElementById(`${skill.substring(0, 4)}PF`);
        if (proficiencyElement) {
            proficiencyElement.checked = skillData.proficiency || false;
        } else {
            console.error(`Element with ID ${skill.substring(0, 4)}PF not found`);
        }
    });
}

function populateHealthStats(data) {
    const healthFields = [
        { id: 'mHP', value: data.playerHealth?.mHP || 20 },
        { id: 'cHP', value: data.playerHealth?.cHP || 20 },
        { id: 'tHP', value: data.playerHealth?.tHP || 20 }
    ];

    healthFields.forEach(field => {
        const element = document.getElementById(field.id);
        if (element) {
            element.value = field.value;
        } else {
            console.error(`Element with ID "${field.id}" not found`);
        }
    });
}

// Update functions
function updateField(fieldName, value) {
    const keys = fieldName.split('.');
    let obj = characterData;

    for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) {
            obj[keys[i]] = {};
        }
        obj = obj[keys[i]];
    }
    obj[keys[keys.length - 1]] = parseInt(value, 10);
    console.log('Updated data:', characterData);

    sendUpdatedData();
}

function sendUpdatedData() {
    fetch('/update-json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(characterData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .catch(error => console.error('Error updating JSON:', error));
}

function updateProficiencyBonus(level) {
    const newPb = calculateProficiencyBonus(level);
    characterData.ProficiencyBonus = newPb;
    const proficiencyBonusElement = document.getElementById('proficiency-bonus');
    if (proficiencyBonusElement) {
        proficiencyBonusElement.textContent = newPb;
    } else {
        console.error('Element with ID "proficiency-bonus" not found');
    }

    updateAllSavingThrows();
    updateAllSkills();
}

function updateModifierData(attribute, value) {
    const modifier = calculateModifier(value);
    if (!characterData.modifiers) {
        characterData.modifiers = {};
    }
    characterData.modifiers[attribute] = modifier;
    sendUpdatedData();
}

function updateModifierDOM(elementId, modifierValue) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = modifierValue >= 0 ? `+${modifierValue}` : modifierValue;
    } else {
        console.error(`Element with ID "${elementId}" not found`);
    }
}

function updateModifier(attribute, value) {
    const modifier = calculateModifier(value);
    updateModifierDOM(`${attribute}M`, modifier);
    updateModifierData(attribute, value);
}

function updateAllModifiers() {
    const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    attributes.forEach(attribute => {
        const element = document.querySelector(`input[name="${attribute}"]`);
        if (element) {
            const value = element.value;
            updateModifier(attribute, value);
        } else {
            console.error(`Element with name "${attribute}" not found`);
        }
    });
}

function updateSavingThrow(attribute) {
    const element = document.querySelector(`input[name="${attribute}"]`);
    if (element) {
        const value = element.value;
        const isProficient = document.getElementById(`${attribute}PF`).checked;
        const pb = calculateProficiencyBonus(characterData.level);
        const savingThrow = calculateSavingThrowModifier(value, isProficient, pb);
        const savingThrowElement = document.getElementById(`${attribute}STM`);
        if (savingThrowElement) {
            savingThrowElement.textContent = savingThrow >= 0 ? `+${savingThrow}` : savingThrow;
        } else {
            console.error(`Element with ID "${attribute}STM" not found`);
        }
    } else {
        console.error(`Element with name "${attribute}" not found`);
    }
}

function updateAllSavingThrows() {
    const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    attributes.forEach(attribute => {
        updateSavingThrow(attribute);
    });
}

function updateSkill(skill) {
    const skillKey = skill.substring(0, 4);
    const skillData = characterData.skills[skillKey];
    if (!skillData || !skillData.stat) {
        console.error(`Skill data for ${skillKey} is missing or malformed`);
        return;
    }
    const stat = skillData.stat;
    const element = document.querySelector(`input[name="${stat}"]`);
    if (element) {
        const value = element.value;
        const isProficient = document.getElementById(`${skillKey}PF`).checked;
        const isExpert = document.getElementById(`${skillKey}EX`).checked;
        const pb = calculateProficiencyBonus(characterData.level);
        const skillModifier = calculateSkillModifier(value, isProficient, isExpert, pb);
        const skillElement = document.getElementById(`${skillKey}SM`);
        
        if (skillElement) {
            skillElement.textContent = skillModifier >= 0 ? `+${skillModifier}` : skillModifier;
        } else {
            console.error(`Element with ID ${skillKey}SM not found`);
        }
    } else {
        console.error(`Element with name "${stat}" not found`);
    }
}

function updateAllSkills() {
    const skills = [
        'acro', 'anim', 'arca', 'athl', 'dece', 
        'hist', 'insi', 'inti', 'inve', 'medi', 
        'natu', 'perc', 'perf', 'pers', 'reli', 
        'slei', 'stea', 'surv'
    ];
    skills.forEach(skill => {
        updateSkill(skill);
    });
}

function updateWeaponStats(weaponName) {
    const weapon = weaponData.find(w => w.name.toLowerCase() === weaponName.toLowerCase());
    if (weapon) {
        const attackStat = weapon.attackStat;
        const proficiencyBonus = characterData.ProficiencyBonus;
        const attackModifier = characterData.modifiers[attackStat]; 
        const totalAttack = proficiencyBonus + attackModifier;

        console.log('Attack Stat:', attackStat);
        console.log('Proficiency Bonus:', proficiencyBonus);
        console.log('Attack Modifier calc:', characterData.modifiers[attackStat]); 
        console.log('Attack Modifier:', attackModifier);
        console.log('Total Attack:', totalAttack);

        document.getElementById('wATK').textContent = `+${totalAttack}`;
        document.getElementById('wDMG').textContent = `${weapon.damage} + ${attackModifier}`;
        document.getElementById('wRange').textContent = weapon.range;
        document.getElementById('wProp').textContent = weapon.properties;
    } else {
        console.log('Weapon not found. Resetting values.');

        document.getElementById('wATK').textContent = '-';
        document.getElementById('wDMG').textContent = '-';
        document.getElementById('wRange').textContent = '-';
        document.getElementById('wProp').textContent = '-';
    }
}

// Define the missing function
function initializeModifiersAndSkills() {
    updateAllModifiers();
    updateAllSavingThrows();
    updateAllSkills();
}

// Initialize data on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeData);

// Make functions globally accessible
window.updateField = updateField;
window.updateSavingThrow = updateSavingThrow;
window.updateSkill = updateSkill;
window.updateplayerHealth = updateField;
window.updateWeaponStats = updateWeaponStats;
window.updateProficiencyBonus = updateProficiencyBonus;
