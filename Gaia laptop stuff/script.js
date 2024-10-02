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

    // Access background data using bracket notation
    const backgroundData = backgroundAbilitiesData[selectedBackground] || backgroundAbilitiesData[selectedBackground.replace(/ /g, '')];
    const abilities = backgroundData?.abilities || [];
    const proficiencies = backgroundData?.proficiencies || [];
    const tools = backgroundData?.tools || [];  // Get tools from the background data
    const languages = backgroundData?.Language || [];  // Access languages from the background data

    // Display abilities
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

    // Clear the existing tool list
    const toolList = document.getElementById('toolList');
    toolList.innerHTML = ''; // Clear previous tool entries

    // Add tools to the tool list
    tools.forEach(tool => {
        const listItem = document.createElement('li');
        listItem.textContent = tool; // Add the tool name to the list
        // Allow removal of items by clicking
        listItem.addEventListener('click', function () {
            toolList.removeChild(listItem);
        });
        toolList.appendChild(listItem);
    });

    // Clear the existing language list
    const languageList = document.getElementById('languageList');
    languageList.innerHTML = ''; // Clear previous language entries

    // Add existing languages from the background
    languages.forEach(language => {
        const listItem = document.createElement('li');
        listItem.textContent = language; // Add the language name to the list
        // Allow removal of items by clicking
        listItem.addEventListener('click', function () {
            languageList.removeChild(listItem);
        });
        languageList.appendChild(listItem);
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

    // Ensure input and list elements exist
    if (!input || !list) return;

    input.addEventListener('keypress', function (event) {
        if (event.key === 'Enter' && input.value.trim() !== '') {
            const listItem = document.createElement('li');
            listItem.textContent = input.value.trim();
            
            // Allow removal of items by clicking
            listItem.addEventListener('click', function () {
                list.removeChild(listItem);
            });

            list.appendChild(listItem);
            input.value = ''; // Clear input after adding
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

function checkLastRow(input) {
    const equipmentTableBody = document.getElementById('equipmentTableBody');
    const rows = equipmentTableBody.getElementsByTagName('tr');
    const lastRow = rows[rows.length - 1]; // Get the last row

    // Check if the last input field is filled
    const lastInput = lastRow.querySelector('input');
    if (lastInput && lastInput.value.trim() !== '') {
        addEquipmentRow(); // Add a new row if the last input is filled
    }
}

function addEquipmentRow() {
    const equipmentTableBody = document.getElementById('equipmentTableBody');
    
    // Create a new row
    const newRow = document.createElement('tr');
    
    // Create a cell with input for equipment and the remove button
    const equipmentCell = document.createElement('td');
    
    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.className = 'remove-button';
    removeButton.innerHTML = '×';
    removeButton.onclick = function() { removeEquipmentRow(removeButton); };
    
    // Create equipment input
    const equipmentInput = document.createElement('input');
    equipmentInput.type = 'text';
    equipmentInput.className = 'input-box';
    equipmentInput.placeholder = 'Add equipment';
    equipmentInput.oninput = function() { checkLastRow(equipmentInput); }; // Check this input too

    // Append button and input to the cell
    const inputContainer = document.createElement('div');
    inputContainer.className = 'input-container';
    inputContainer.appendChild(removeButton);
    inputContainer.appendChild(equipmentInput);
    
    // Append the container to the cell
    equipmentCell.appendChild(inputContainer);
    
    // Append the cell to the new row
    newRow.appendChild(equipmentCell);
    
    // Append the new row to the table body
    equipmentTableBody.appendChild(newRow);
    
    // Enable the remove button for the new row
    if (equipmentTableBody.children.length > 1) {
        equipmentTableBody.children[1].querySelector('.remove-button').disabled = false;
    }
}

function removeEquipmentRow(button) {
    const row = button.closest('tr'); // Get the row of the button
    const equipmentTableBody = document.getElementById('equipmentTableBody');
    
    // Ensure that we don't remove the first item
    if (row !== equipmentTableBody.firstElementChild) {
        row.parentElement.removeChild(row); // Remove the row if it's not the first
    }
}

function showSubraceOptions() {
    const raceSelect = document.getElementById("prace");
    const subraceRow = document.getElementById("subraceRow");
    const subraceSelect = document.getElementById("psubrace");

    // Clear previous options
    subraceSelect.innerHTML = "";

    // Show the subrace row
    subraceRow.style.display = "table-row";

    const selectedRace = raceSelect.value;

    // Check if the selected race has subraces
    if (races[selectedRace]?.subraces) {
        // Populate subrace options
        for (const subrace in races[selectedRace].subraces) {
            const option = document.createElement("option");
            option.value = subrace;
            option.textContent = subrace.charAt(0).toUpperCase() + subrace.slice(1);
            subraceSelect.appendChild(option);
        }
    } else {
        subraceRow.style.display = "none"; // Hide if no subraces available
    }
}

function showSubclassOptions() {
    const classSelect = document.getElementById("pclass");
    const subclassRow = document.getElementById("subclassRow");
    const subclassSelect = document.getElementById("psubclass");

    // Clear previous options
    subclassSelect.innerHTML = "";

    // Show the subclass row
    subclassRow.style.display = "table-row";

    const selectedClass = classSelect.value;

    // Check if the selected class has subclasses
    if (classes[selectedClass]?.subclasses) {
        // Populate subclass options
        for (const subclass in classes[selectedClass].subclasses) {
            const option = document.createElement("option");
            option.value = subclass;
            option.textContent = subclass.charAt(0).toUpperCase() + subclass.slice(1);
            subclassSelect.appendChild(option);
        }
    } else {
        subclassRow.style.display = "none"; // Hide if no subclasses available
    }
}
