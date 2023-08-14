import { chosenStartYear, chosenEndYear } from "./InitializeHtml.js";
import { blurOptions, getBlurOverlay, getBlurEnumsByCardType, getRandomEnum, getSelectedBlurOptions } from "./blurUtils.js";
import { getRandomCardData, compareRandom } from "./cardUtils.js";
import { makeOptions, getAllOptions } from "./optionsUtils.js";

export let correctAnswer;

export async function generateRandomCard() {
  try {

    const cardContainerBefore = document.getElementById('cardContainer');
    const existingCard = document.getElementById('spawnedContainer');
    const existingOption = document.getElementById('optionsContainID');
    const button = document.getElementById("startGameButtonID");
    button.disabled = true;

    document.body.style.overflow = 'hidden';

    if (existingCard) {
      existingCard.style.top = '200%';
      existingOption.style.top = '200%';
      console.log(existingOption);
      await new Promise((resolve) => setTimeout(resolve, 500));
      cardContainerBefore.removeChild(existingCard);
      cardContainerBefore.removeChild(existingOption);

    }


    const selectedBlurOptions = getSelectedBlurOptions(blurOptions);
    const enumValue = getRandomEnum(selectedBlurOptions);

    let guessfilterProperty = [];
    let guessfilterValues = [];
    let guessincludeFilter = true;

    if (getBlurEnumsByCardType("Spell Card").includes(enumValue) == false) {
      guessfilterProperty = ["type"];
      guessfilterValues = ["Spell Card", "Trap Card"];
      guessincludeFilter = false;
    }

    const data = await getRandomCardData(guessfilterProperty, guessfilterValues, guessincludeFilter, [chosenStartYear, chosenEndYear], true);

    //console.log(data.misc_info[0].tcg_date + " This is the start " + chosenStartYear + " tis is the end " + chosenEndYear);

    if(data.id === undefined || data.id === null)
      generateRandomCard();
  
    const cardId = data.id ;
    const cardName = data.name === undefined || data.id === null ? "No Name" : data.name;
    const cardImage = `https://fh-yugiguessr-images.s3.eu-north-1.amazonaws.com/card_images/${cardId}.jpg`;
    const cardBack = `Card-back.png`;
    const cardType = data.type;

    var randomCardsData = [];
    for (var i = 0; i < 2; i++) {
      var tries = 0;
      if (getBlurEnumsByCardType("Spell Card").includes(enumValue)) {
        while (true) {
          const random = await getRandomCardData(["type"], [cardType], true, [chosenStartYear, chosenEndYear], true);
          var same = compareRandom(data, randomCardsData, random, enumValue);
          if (same == false) {
            randomCardsData[i] = random;
            break;
          }
          tries += 1;
          if (tries > 10) {
            randomCardsData[i] = random;
            break;
          }
        }
      } else {
        while (true) {
          const random = await getRandomCardData(["type"], ["Spell Card", "Trap Card"], false, [chosenStartYear, chosenEndYear], true);
          var same = compareRandom(data, randomCardsData, random, enumValue);
          if (same == false) {
            randomCardsData[i] = random;
            break;
          }
          tries += 1;
          if (tries > 10) {
            randomCardsData[i] = random;
            break;
          }
        }
      }
    }

    let optionsArray = await getAllOptions(enumValue, data, randomCardsData);
    //console.log("This is the question " + enumValue);

    const blurredImage = `
        <div class="imageContainer" id="spawnedContainer">    
          <div class="cardBack">
            <img draggable="false" src="${cardBack}" alt="Card Back" />
          </div>
          <div class="cardFront">
            <img draggable="false" src="${cardImage}" alt="${cardName}" />
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
      spawnedContainer.style.left = '20%';
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
        const containsImage = (enumValue == 'art');
        correctAnswer = optionsArray[0];
        optionsArray = shuffleArray(optionsArray);
        makeOptions(optionsContainer, optionsArray, containsImage, enumValue);
        cardContainer.appendChild(optionsContainer);
        setTimeout(() => {
          optionsContainer.style.right = '20%';
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


function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
