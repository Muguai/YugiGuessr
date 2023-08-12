import { blurOptions } from "./blurUtils.js";

/*
function generateCheckboxMarkup(option) {
    return `
        <input class="custom-check" type="checkbox" id="checkbox_${option}" name="blurOption" value="${option}" checked>
        <label for="checkbox_${option}">${option}</label>
    `;
}

function generateRadioMarkup(option) {
    return `
        <div>
          <input type="radio" id="radio_${option}" name="blurOption" value="${option}">
          <label for="radio_${option}">${option}</label>
        </div>
        
    `;
}

function generateCheckboxOptions(blurOptions) {
    const checkboxesMarkup = blurOptions.map((option) => generateRadioMarkup(option)).join('');
    return `
        <span>Blur Options<span>
        <div class="checkboxWrapper">
          ${checkboxesMarkup}
        </div>
    `;
}

export const checkboxOptions = generateCheckboxOptions(blurOptions);
// Insert the checkbox options into the HTML
const checkboxContainer = document.getElementById('checkboxContainer');
checkboxContainer.innerHTML = checkboxOptions;
*/

const blurOptionSelect = document.getElementById('blurOptionSelect');

for (let blur of blurOptions) {
    const option = document.createElement('option');
    option.value = blur;
    option.text = blur;
    if (blur === "random") {
        option.selected = true;
    }
    blurOptionSelect.appendChild(option);
}


const startYearSelect = document.getElementById('startYearSelect');
const endYearSelect = document.getElementById('endYearSelect');
export let chosenStartYear = "2002";
export let chosenEndYear = "2023";




// Generate options for years from 2000 to 2023
for (let year = 2002; year <= 2023; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.text = year;
    startYearSelect.appendChild(option);
    endYearSelect.appendChild(option.cloneNode(true));
}

// Event listener for startYearSelect change
startYearSelect.addEventListener('change', () => {
    const startYear = parseInt(startYearSelect.value);
    const currentEndYear = parseInt(endYearSelect.value)

    chosenStartYear = startYearSelect.value;
    if (currentEndYear < startYear)
        endYearSelect.value = startYearSelect.value;

    // Disable options in endYearSelect with lower values than startYear
    for (let i = 0; i < endYearSelect.options.length; i++) {
        const endYear = parseInt(endYearSelect.options[i].value);

        endYearSelect.options[i].disabled = endYear < startYear;
    }
});

endYearSelect.addEventListener('change', () => {
    chosenEndYear = endYearSelect.value;
});

