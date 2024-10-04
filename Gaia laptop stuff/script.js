// Get the input element and proficiency bonus display element
const levelInput = document.getElementById('inlevel');
const ppb = document.getElementById('ppb');

let raceAbilitiesData = {};
let backgroundAbilitiesData = {};

// Fetch racial abilities JSON
fetch('races.json')
    .then(response => response.json())
    .then(data => {
        raceAbilitiesData = data.races;
        updateRacialAbilities();
    })
    .catch(error => console.error('Error loading racial abilities:', error));

// Fetch background abilities JSON
fetch('backgrounds.json')
    .then(response => response.json())
    .then(data => {
        backgroundAbilitiesData = data.backgrounds;
        updateBackgroundAbilities();
    })
    .catch(error => console.error('Error loading background abilities:', error));

function calculateProficiencyBonus(level) {
    return Math.floor((level - 1) / 4) + 2;
}

function calculateModifier(value) {
    return Math.floor((value - 10) / 2);
}

function updateModifiersAndBonus() {
    const level = parseInt(levelInput.value, 10);
    const proficiencyBonus = calculateProficiencyBonus(level);
    ppb.textContent = proficiencyBonus;

    const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    attributes.forEach(attr => {
        const score = parseInt(document.getElementById(`b${attr}`).value, 10);
        const modifier = calculateModifier(score);
        document.getElementById(`${attr}Mod`).textContent = modifier >= 0 ? `+${modifier}` : modifier;
    });

    updateSavingThrows();
    updateSkills();  // Ensure skills are updated when modifiers change
}

function updateSavingThrows() {
    const proficiencyBonus = parseInt(ppb.textContent);
    const attributes = ['str', 'dex', 'con', 'int', 'wis', 'cha'];
    
    attributes.forEach(attr => {
        const score = parseInt(document.getElementById(`b${attr}`).value, 10);
        let modifier = calculateModifier(score);
        const isProficient = document.getElementById(`${attr}PF`).checked;
        
        if (isProficient) {
            modifier += proficiencyBonus;
        }
        
        document.getElementById(`${attr}SF`).textContent = modifier >= 0 ? `+${modifier}` : modifier;
    });
}

function updateSkills() {
    const proficiencyBonus = parseInt(ppb.textContent) || 0; // Ensure it defaults to 0 if parsing fails
    const skills = [
        { name: 'acro', ability: 'dex' },
        { name: 'anim', ability: 'wis' },
        { name: 'arca', ability: 'int' },
        { name: 'athl', ability: 'str' },
        { name: 'dece', ability: 'cha' },
        { name: 'hist', ability: 'int' },
        { name: 'insi', ability: 'wis' },
        { name: 'inti', ability: 'cha' },
        { name: 'inve', ability: 'int' },
        { name: 'medi', ability: 'wis' },
        { name: 'natu', ability: 'int' },
        { name: 'perc', ability: 'wis' },
        { name: 'perf', ability: 'cha' },
        { name: 'pers', ability: 'cha' },
        { name: 'reli', ability: 'int' },
        { name: 'slei', ability: 'dex' },
        { name: 'stea', ability: 'dex' },
        { name: 'surv', ability: 'wis' }
    ];

    skills.forEach(skill => {
        const abilityScore = parseInt(document.getElementById(`b${skill.ability}`).value, 10) || 0; // Default to 0
        let modifier = calculateModifier(abilityScore);
        const isProficient = document.getElementById(`${skill.name}PF`)?.checked || false; // Default to false
        const isExpert = document.getElementById(`${skill.name}EX`)?.checked || false; // Default to false

        if (isProficient) modifier += proficiencyBonus;
        if (isExpert) modifier += proficiencyBonus;

        document.getElementById(`${skill.name}Mod`).textContent = modifier >= 0 ? `+${modifier}` : modifier;
    });
}


function updateRacialAbilities() {
    const selectedRace = document.getElementById('prace').value;
    const raceABContainer = document.getElementById('raceABContainer');
    raceABContainer.innerHTML = '';

    const abilities = raceAbilitiesData[selectedRace]?.abilities || [];
    abilities.forEach(ability => {
        const abilityItem = document.createElement('p');
        abilityItem.innerHTML = `<strong>${ability.title}</strong>: ${ability.description}`;
        raceABContainer.appendChild(abilityItem);
    });
}

function updateBackgroundAbilities() {
    const selectedBackground = document.getElementById('pbackground').value;
    const backgroundABContainer = document.getElementById('backgroundABContainer');
    backgroundABContainer.innerHTML = '';

    const backgroundData = backgroundAbilitiesData[selectedBackground];
    const abilities = backgroundData?.abilities || [];
    const proficiencies = backgroundData?.proficiencies || [];

    abilities.forEach(ability => {
        const abilityItem = document.createElement('p');
        abilityItem.innerHTML = `<strong>${ability.title}</strong>: ${ability.description}`;
        backgroundABContainer.appendChild(abilityItem);
    });

    // Reset all proficiencies
    document.querySelectorAll('[id$="PF"]').forEach(checkbox => checkbox.checked = false);

    // Set proficiencies from background
    proficiencies.forEach(pfId => {
        const checkbox = document.getElementById(pfId);
        if (checkbox) checkbox.checked = true;
    });

    updateSavingThrows();
    updateSkills();
}

// Event listeners
levelInput.addEventListener('input', updateModifiersAndBonus);
document.getElementById('prace').addEventListener('change', () => {
    updateRacialAbilities();
    updateSkills();  // Update skills when race changes
});
document.getElementById('pbackground').addEventListener('change', () => {
    updateBackgroundAbilities();
    updateSkills();  // Update skills when background changes
});

// Add event listeners for ability score inputs
['str', 'dex', 'con', 'int', 'wis', 'cha'].forEach(attr => {
    document.getElementById(`b${attr}`).addEventListener('input', updateModifiersAndBonus);
});

// Add event listeners for proficiency checkboxes
document.querySelectorAll('[id$="PF"]').forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateSavingThrows();
        updateSkills();
    });
});

// Add event listeners for expertise checkboxes
document.querySelectorAll('[id$="EX"]').forEach(checkbox => {
    checkbox.addEventListener('change', updateSkills);
});

// Function to handle adding items to the list
function addItem(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && input.value.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = input.value.trim();
            listItem.addEventListener('click', function () {
                list.removeChild(listItem);
            });
            list.appendChild(listItem);
            input.value = ''; // Clear the input field
        }
    });
}

// Initialize event listeners for each input field
addItem('inweapon', 'weaponList');
addItem('inarmor', 'armorList');
addItem('intool', 'toolList');
addItem('inlanguage', 'languageList');





// Initialize
updateModifiersAndBonus();
updateRacialAbilities();
updateBackgroundAbilities();
updateSkills();  // Ensure skills are updated on initial load
