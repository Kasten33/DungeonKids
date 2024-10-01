document.addEventListener('DOMContentLoaded', (event) => {
    const elements = {
      levelInput: document.getElementById('inlevel'),
      classSelect: document.getElementById('pclass'),
      subclassSelect: document.getElementById('psclass'),
      raceSelect: document.getElementById('prace'),
      backgroundSelect: document.getElementById('pbacktround'),
      inspirationCheckbox: document.getElementById('inspirationA'),
      bardicCheckbox: document.getElementById('bardicA'),
      expInput: document.getElementById('inexp'),
      hairInput: document.getElementById('inhair'),
      eyesInput: document.getElementById('ineyes'),
      skinInput: document.getElementById('inskin'),
      heightInput: document.getElementById('inheight'),
      weightInput: document.getElementById('inweight'),
      personalityInput: document.getElementById('inpersonality'),
      idealsInput: document.getElementById('inideals'),
      bondsInput: document.getElementById('inbonds'),
      flawsInput: document.getElementById('inflaws'),
      weaponsInput: document.getElementById('inweapons'),
      armorInput: document.getElementById('inarmor'),
      toolsInput: document.getElementById('intools'),
      languagesInput: document.getElementById('inlanguages'),
      strInput: document.getElementById('bstr'),
      dexInput: document.getElementById('bdex'),
      conInput: document.getElementById('bcon'),
      intInput: document.getElementById('bint'),
      wisInput: document.getElementById('bwis'),
      chaInput: document.getElementById('bcha'),
      strSaveCheckbox: document.getElementById('strPF'),
      dexSaveCheckbox: document.getElementById('dexPF'),
      conSaveCheckbox: document.getElementById('conPF'),
      intSaveCheckbox: document.getElementById('intPF'),
      wisSaveCheckbox: document.getElementById('wisPF'),
      chaSaveCheckbox: document.getElementById('chaPF'),
      acrobaticsCheckbox: document.getElementById('acrobaticsPF'),
      animalHandlingCheckbox: document.getElementById('animalHandlingPF'),
      arcanaCheckbox: document.getElementById('arcanaPF'),
      athleticsCheckbox: document.getElementById('athleticsPF'),
      deceptionCheckbox: document.getElementById('deceptionPF'),
      historyCheckbox: document.getElementById('historyPF'),
      insightCheckbox: document.getElementById('insightPF'),
      intimidationCheckbox: document.getElementById('intimidationPF'),
      investigationCheckbox: document.getElementById('investigationPF'),
      medicineCheckbox: document.getElementById('medicinePF'),
      natureCheckbox: document.getElementById('naturePF'),
      perceptionCheckbox: document.getElementById('perceptionPF'),
      performanceCheckbox: document.getElementById('performancePF'),
      persuasionCheckbox: document.getElementById('persuasionPF'),
      religionCheckbox: document.getElementById('religionPF'),
      sleightOfHandCheckbox: document.getElementById('sleightOfHandPF'),
      stealthCheckbox: document.getElementById('stealthPF'),
      survivalCheckbox: document.getElementById('survivalPF'),
      racialAbilityInput: document.getElementById('raceAB'),
      classAbilityInput: document.getElementById('classAB'),
      featsAbilityInput: document.getElementById('featAB')
    };
  
    function updateJSON() {
      const characterData = {};
      for (const [key, element] of Object.entries(elements)) {
        if (element.type === 'checkbox') {
          characterData[key] = element.checked;
        } else {
          characterData[key] = element.value;
        }
      }
  
      const jsonData = JSON.stringify(characterData, null, 2); // Pretty print JSON with 2 spaces
      console.log(jsonData); // You can replace this with any other action, like sending it to a server
      saveData(characterData);
    }
  
    function saveData(data) {
      fetch('/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data, null, 2) // Pretty print JSON with 2 spaces
      })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
      })
      .catch(err => console.error('Error:', err));
    }
  
    function updateProficiencyBonus(level) {
      const proficiencyBonus = Math.floor((level - 1) / 4) + 2;
      document.getElementById('pbDisplay').textContent = `PB: ${proficiencyBonus}`;
    }
  
    // Attach event listeners
    for (const element of Object.values(elements)) {
      if (element.type === 'checkbox' || element.type === 'select-one') {
        element.addEventListener('change', updateJSON);
      } else {
        element.addEventListener('input', updateJSON);
      }
    }
  
    // Initial call to set the JSON on page load
    fetch('data.json')
      .then(response => response.json())
      .then(data => {
        for (const [key, value] of Object.entries(data)) {
          if (elements[key].type === 'checkbox') {
            elements[key].checked = value;
          } else {
            elements[key].value = value;
          }
        }
        updateProficiencyBonus(data.level);
      })
      .catch(err => console.log('No saved data found.'));
  });