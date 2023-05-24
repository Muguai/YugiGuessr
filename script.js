function generateCheckboxMarkup(option) {
  return `
      <input type="checkbox" id="checkbox_${option}" name="blurOption" value="${option}" checked>
      <label for="checkbox_${option}">${option}</label>
  `;
}

function generateCheckboxOptions(blurOptions) {
  const checkboxesMarkup = blurOptions.map((option) => generateCheckboxMarkup(option)).join('');
  return `
    <div id="checkboxesContainer">
      <h4 class="optionsTitle">Options</h4>
      <div class="checkboxWrapper">
        ${checkboxesMarkup}
      </div>
    </div>
  `;
}

const startYearSelect = document.getElementById('startYearSelect');
const endYearSelect = document.getElementById('endYearSelect');
var chosenStartYear = "2002";
var chosenEndYear = "2023";


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
  if(currentEndYear < startYear)
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

// Example usage
const blurOptions = ['attribute', 'level', 'effect', 'cardName', 'art', 'attackDef', 'type'];
const checkboxOptions = generateCheckboxOptions(blurOptions);

// Insert the checkbox options into the HTML
const checkboxContainer = document.getElementById('checkboxContainer');
checkboxContainer.innerHTML = checkboxOptions;

let correctAnswer;

function handleOptionClick(option) {
  // Reset the color of all options
  var options = document.getElementsByClassName("option");
  for (var i = 0; i < options.length; i++) {
    options[i].style.backgroundColor = "#e0e0e0";
    options[i].style.border = "none";
    options[i].removeAttribute("onclick");
  }

  var selectedOptionText = option.textContent;
  console.log("Selected option:", selectedOptionText + " Correct Answer " + correctAnswer);

  const containsImage = option.querySelector('img') !== null;

  // Get the string for the entire img element inside the div
  const imgString = containsImage ? option.querySelector('img').outerHTML : '';
  if(containsImage){
    const matchSRC1 = imgString.match(/src="([^"]+)"/)[1];
    correctAnswer = correctAnswer.match(/src="([^"]+)"/)[1];
    console.log("This is the selected image " + imgString + " This is the correct answer " + correctAnswer);
    if(correctAnswer == matchSRC1){
      option.style.border = "4px solid green";
    }else{
      for (var i = 0; i < options.length; i++) {
        const imgString = options[i].querySelector('img').outerHTML;
        const matchSRC2 = imgString.match(/src="([^"]+)"/)[1];
        if(matchSRC2 == correctAnswer)
          options[i].style.border = "4px solid green"
      }

      console.log()
      option.style.border = "4px solid red";
    }
    return;
  }

  console.log("This is the selected text " + selectedOptionText);

  if(selectedOptionText == correctAnswer){
    option.style.border = "4px solid green";
  }else{
    for (var i = 0; i < options.length; i++) {
      if(options[i].textContent == correctAnswer)
        options[i].style.border = "4px solid green"
    }
    //options[correctAnswer].style.border = "4px solid green";
    console.log()
    option.style.border = "4px solid red";
  }
  console.log("Selected option index:", selectedOptionIndex);
}


async function generateRandomCard() {
    try {

      const cardContainerBefore = document.getElementById('cardContainer');
      const existingCard = document.getElementById('spawnedContainer');
      const existingOption = document.getElementById('optionsContainID');
      const button = document.getElementById("startGameButtonID");

      // Disable the button
      button.disabled = true;

      
      document.body.style.overflow = 'hidden';
      // Move the existing card to the bottom of the screen
      if (existingCard) {
        existingCard.style.bottom = '-200%';
        existingOption.style.top = '200%';
        console.log(existingOption);
        await new Promise((resolve) => setTimeout(resolve, 500));
        cardContainerBefore.removeChild(existingCard);
        cardContainerBefore.removeChild(existingOption);

      }

      
      const selectedBlurOptions = getSelectedBlurOptions(blurOptions);
      const enumValue = getRandomEnum(selectedBlurOptions);

      let guessfilterProperty = "noFilter";
      let guessfilterValues = [];
      let guessincludeFilter = true;

      if (getBlurEnumsByCardType("Spell Card").includes(enumValue) == false) {
        guessfilterProperty = "type";
        guessfilterValues = ["Spell Card", "Trap Card"];
        guessincludeFilter = false;
      }

      const data = await getRandomCardData(guessfilterProperty, guessfilterValues, guessincludeFilter, [chosenStartYear, chosenEndYear], true);
      



      console.log(data.misc_info[0].tcg_date + " This is the start " + chosenStartYear + " tis is the end " + chosenEndYear);
      const cardId = data.id;
      const cardName = data.name;
      const cardImage = `card_images/${cardId}.jpg`;
      const cardBack = `Card-back.png`;
      const cardType = data.type;

      
      var randomCardsData = [];
      for(var i = 0; i < 2; i++){
        var tries = 0;
        if(getBlurEnumsByCardType("Spell Card").includes(enumValue)){
          while(true){
            const random = await getRandomCardData("type", [cardType], true, [chosenStartYear, chosenEndYear], true );
            var same = compareRandom(data, randomCardsData, random, enumValue);
            if(same == false){
              randomCardsData[i] = random;
              break;
            }
            tries += 1;
            if(tries > 10){
              randomCardsData[i] = random;
              break;
            }
          } 
        }else{
          while(true){
            const random = await getRandomCardData("type", ["Spell Card", "Trap Card"], false, [chosenStartYear, chosenEndYear], true);
            var same = compareRandom(data, randomCardsData, random, enumValue);
            if(same == false){
              randomCardsData[i] = random;
              break;
            }
            tries += 1;
            if(tries > 10){
              randomCardsData[i] = random;
              break;
            }
          }
        }      
      }
      
      optionsArray = await getAllOptions(enumValue, data, randomCardsData);
      //console.log("This is the question " + enumValue);

      const blurredImage = `
        <div class="imageContainer" id="spawnedContainer">    
          <div class="cardBack">
            <img src="${cardBack}" alt="Card Back" />
          </div>
          <div class="cardFront">
            <img src="${cardImage}" alt="${cardName}" />
            ${getBlurOverlay(enumValue)}
          </div>
        </div>
      `;

      const cardContainer = document.getElementById('cardContainer');

      cardContainer.innerHTML = `
        ${blurredImage}
      `;
      

      setTimeout(() => {
        const spawnedContainer = document.getElementById('spawnedContainer');
        spawnedContainer.style.left = '100%';
        document.body.style.overflow = '';
      }, 300);
      
      // Delayed rotation after a few seconds
      setTimeout(() => {
        const spawnedContainer = document.getElementById('spawnedContainer');
        spawnedContainer.style.transform = 'rotateY(180deg)';

        setTimeout(() => {
          const optionsContainer = document.createElement('div');
          optionsContainer.id = 'optionsContainID';
          optionsContainer.classList.add('optionsContainer');
          console.log("This is the options array " + optionsArray);
          containsImage = (enumValue == 'art');
          makeOptions(optionsContainer, optionsArray, containsImage);
          cardContainer.appendChild(optionsContainer);
          setTimeout(() => {
            optionsContainer.style.left = '250%';  
            button.disabled = false;
          }, 500);
        }, 100);
      }, 1500);
      
    } catch (error) {
      console.error(error);
      const cardContainer = document.getElementById('cardContainer');
      cardContainer.innerHTML = `
        <h3>Error Generating Card</h3>
      `;
    }
  }

  async function getAllOptions(questionEnum, cardData, randomCardData){
    var optionsArray = [];

    switch (questionEnum) {
      case "attribute":
        optionsArray.push(cardData.attribute);
        for(var i = 0; i < 2; i++){
          optionsArray.push(randomCardData[i].attribute);
        }
        break;
      case "level":
        optionsArray.push(cardData.level);
        for(var i = 0; i < 2; i++){
          optionsArray.push(randomCardData[i].level);
        }
        break;
      case "effect":
        optionsArray.push(cardData.desc);
        for(var i = 0; i < 2; i++){
          optionsArray.push(randomCardData[i].desc);
        }
        break;
      case "cardName":
        optionsArray.push(cardData.name);
        for(var i = 0; i < 2; i++){
          optionsArray.push(randomCardData[i].name);
        }
        break;
      case "art":
        optionsArray.push(`<img src="card_images_cropped/${cardData.id}.jpg" alt=${cardData.name}>`);
        for(var i = 0; i < 2; i++){
          optionsArray.push(`<img src="card_images_cropped/${randomCardData[i].id}.jpg" alt=${randomCardData[i].name}>`);
        }
        break;
      case "attackDef":
        optionsArray.push(cardData.atk + "/" + cardData.def);
        for(var i = 0; i < 2; i++){
          optionsArray.push(randomCardData[i].atk + "/" + randomCardData[i].def);
        }
        break;
      case "type":
        optionsArray.push(cardData.race);
        for(var i = 0; i < 2; i++){
          optionsArray.push(randomCardData[i].race);
        }
        break;
      default:
        break;
    }

    return optionsArray;
  }

  

  function getRandomCardData(filterProperty, filterValues = [], includeFilter = true, yearRange = [],includeYear = true) {
    return fetch('card_data/card_data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        return response.json();
      })
      .then(data => {
        const cardDataArray = data.data;
        const numCards = cardDataArray.length;
  
        let filteredCards = cardDataArray;
        //console.log(yearRange.length)
         // Filter by year range
        if (yearRange.length == 2) {
          //console.log("PareYear");
          const startYear = parseInt(yearRange[0]);
          const endYear = parseInt(yearRange[1]);

          if (!isNaN(startYear) && !isNaN(endYear)) {
            if (includeYear) {
            filteredCards = filteredCards.filter(card => {
              const tcgYear = parseInt(card.misc_info[0]?.tcg_date?.split('-')[0]);
              return !isNaN(tcgYear) && tcgYear >= startYear && tcgYear <= endYear;
            });
            }else{
              filteredCards = filteredCards.filter(card => {
                const tcgYear = parseInt(card.misc_info[0]?.tcg_date?.split('-')[0]);
                return isNaN(tcgYear) || tcgYear < startYear || tcgYear > endYear;
              });
            }            
          }
        }

        // filter by card values
        if(filterProperty != "noFilter"){      
            if (includeFilter) {
              filteredCards = filteredCards.filter(card => filterValues.includes(card[filterProperty]));
            } else {
              filteredCards = filteredCards.filter(card => !filterValues.includes(card[filterProperty]));
            }
        }
  
        const randomIndex = Math.floor(Math.random() * filteredCards.length);
        //console.log('Random Card Data:', filteredCards[randomIndex]);
        return filteredCards[randomIndex];
      })
      .catch(error => {
        console.error('Error fetching card data:', error);
        return null;
      });
  }


  function makeOptions(optionsContainer, options, containsImage){
    correctAnswer = options[0];
    options = shuffleArray(options);
    optionsContainer.innerHTML = `
            <h3>Question 1</h3>
            <div class="option ${containsImage ? 'center' : 'overflow-auto'}" onclick="handleOptionClick(this)">${options[0]}</div>
            <div class="option ${containsImage ? 'center' : 'overflow-auto'}" onclick="handleOptionClick(this)">${options[1]}</div>
            <div class="option ${containsImage ? 'center' : 'overflow-auto'}" onclick="handleOptionClick(this)">${options[2]}</div>
          `;
  }

  function getSelectedBlurOptions(selectedBlurEnums) {
    const checkboxes = document.getElementsByName('blurOption');
    const selectedOptions = [];
  
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        selectedOptions.push(checkbox.value);
      }
    });
  
    return selectedBlurEnums.filter((enumValue) => selectedOptions.includes(enumValue));
  }

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  

  function getRandomEnum(blurEnums) {
    const randomIndex = Math.floor(Math.random() * blurEnums.length);
    return blurEnums[randomIndex];
  }

  function getBlurEnumsByCardType(cardType) {
    switch (cardType) {
      // Main Deck Types
      case "Effect Monster":
      case "Flip Effect Monster":
      case "Flip Tuner Effect Monster":
      case "Gemini Monster":
      case "Normal Monster":
      case "Normal Tuner Monster":
      case "Pendulum Effect Monster":
      case "Pendulum Effect Ritual Monster":
      case "Pendulum Flip Effect Monster":
      case "Pendulum Normal Monster":
      case "Pendulum Tuner Effect Monster":
      case "Ritual Effect Monster":
      case "Ritual Monster":
        return ['attribute', 'level', 'effect', 'cardName', 'art', 'attackDef', 'type'];
  
      // Spell and Trap Cards
      case "Spell Card":
      case "Trap Card":
        return ['effect', 'cardName', 'art'];
  
      // Extra Deck Types
      case "Fusion Monster":
      case "Link Monster":
      case "Pendulum Effect Fusion Monster":
      case "Synchro Monster":
      case "Synchro Pendulum Effect Monster":
      case "Synchro Tuner Monster":
      case "XYZ Monster":
      case "XYZ Pendulum Effect Monster":
        return ['attribute', 'level', 'effect', 'cardName', 'art', 'attackDef', 'type'];
  
      // Other Types
      case "Skill Card":
        return ['cardName', 'art', 'effect'];
      case "Token":
        return ['attribute', 'level', 'cardName', 'art', 'attackDef', 'type'];
  
      default:
        return ['cardName', 'art'];
    }
  }


  function getBlurOverlay(enumValue) {
    let blurOverlay = '';

    switch (enumValue) {
      case 'attackDef':
        blurOverlay = `<div class="blurAttackDefOverlay"></div>`;
        break;
      case 'cardName':
        blurOverlay = `<div class="blurCardNameOverlay"></div>`;
        break;
      case 'effect':
        blurOverlay = `<div class="blurEffectOverlay"></div>`;
        break;
      case 'attribute':
        blurOverlay = `<div class="blurAttributeOverlay"></div>`;
        break;
      case 'level':
        blurOverlay = `<div class="blurLevelOverlay"></div>`;
        break;
      case 'art':
        blurOverlay = `<div class="blurArtOverlay"></div>`;
        break;
      case 'type':
        blurOverlay = `<div class="blurTypeOverlay"></div>`;
        break;

      default:
        blurOverlay = '';
        break;
    }

    return blurOverlay;
  }

  function compareRandom(data, randomCardsData, comparer, enumValue){
    result = false;
    switch (enumValue) {
      case 'attackDef':
        if(data.atk == comparer.atk && data.def == comparer.def){
            result = true;
        }
        for (const card of randomCardsData) {
          if(card.atk == comparer.atk && card.def == comparer.def){
            result = true;
            break;
          }
        }
        break;
      case 'cardName':
        if(data.cardName == comparer.name){
          result = true;
        }
        for (const card of randomCardsData) {
          if(card.cardName == comparer.name){
            result = true;
            break;
          }
        }
        break;
      case 'effect':
        if(data.desc == comparer.desc){
          result = true;
        }
        for (const card of randomCardsData) {
          if(card.desc == comparer.desc){
            result = true;
            break;
          }
        }
        break;
      case 'attribute':
        if(data.attribute == comparer.attribute){
          result = true;
        }
        for (const card of randomCardsData) {
          if(card.attribute == comparer.attribute){
            result = true;
            break;
          }
        }
        break;
      case 'level':
        if(data.level == comparer.level){
          result = true;
        }
        for (const card of randomCardsData) {
          if(card.level == comparer.level){
            result = true;
            break;
          }
        }
        break;
      case 'art':
        if(data.id == comparer.id){
          result = true;
        }
        for (const card of randomCardsData) {
          if(card.id == comparer.id){
            result = true;
            break;
          }
        }
        break;
      case 'type':
        if(data.race == comparer.race){
          result = true;
        }
        for (const card of randomCardsData) {
          if(card.race == comparer.race){
            result = true;
            break;
          }
        }
      break;
      case 'Spell/Trap':
        if(data.race != comparer.race){
          result = true;
        }
        for (const card of randomCardsData) {
          if(card.race != comparer.race){
            result = true;
            break;
          }
        }
      break;

      default:
        blurOverlay = '';
        break;
    }

    return result;

  }