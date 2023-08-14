import { capitalizeFirstLetter } from "./blurUtils.js";
import { questionNum } from "./gameLoop.js";
import { correctAnswer } from "./generateCard.js";


export function handleOptionClick(option) {
    // Reset the color of all options
    var options = document.getElementsByClassName("option");
    for (var i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = "rgb(65, 164, 196)";
        options[i].style.border = "none";
        options[i].style.pointerEvents = "none";
    }

    var selectedOptionText = option.textContent;
    console.log("Selected option:", selectedOptionText + " Correct Answer " + correctAnswer);

    const containsImage = option.querySelector('img') !== null;

    

    // Get the string for the entire img element inside the div
    const imgString = containsImage ? option.querySelector('img').outerHTML : '';
    if (containsImage) {
        const matchSRC1 = imgString.match(/src="([^"]+)"/)[1];
        const correctAnswerAltered = correctAnswer.match(/src="([^"]+)"/)[1];
        console.log("This is the selected image " + imgString + " This is the correct answer " + correctAnswerAltered);
        if (correctAnswerAltered == matchSRC1) {
            option.style.border = "5px solid green";
            return true;
        } else {
            for (var i = 0; i < options.length; i++) {
                const imgString = options[i].querySelector('img').outerHTML;
                const matchSRC2 = imgString.match(/src="([^"]+)"/)[1];
                if (matchSRC2 == correctAnswerAltered)
                    options[i].style.border = "5px solid green"
            }

            console.log("wronggg");
            option.style.border = "5px solid red";
            return false;
        }
    }

    //console.log("This is the selected text " + selectedOptionText);

    if (selectedOptionText == correctAnswer) {
        option.style.border = "5px solid green";
        return true;
    } else {
        for (var i = 0; i < options.length; i++) {
            if (options[i].textContent == correctAnswer)
                options[i].style.border = "5px solid green";
        }
        //options[correctAnswer].style.border = "4px solid green";
        console.log("wronggg")
        option.style.border = "5px solid red";
        return false;

    }

    
    //console.log("Selected option index:", selectedOptionIndex);
}

export function makeOptions(optionsContainer, options, containsImage, enumValue) {
    optionsContainer.innerHTML = `
              <h3 class="text-center">Guess the ${capitalizeFirstLetter(enumValue)} - #${questionNum}</h3>
              <div class="option text-center ${containsImage ? 'center' : 'overflow-auto'}">${options[0]}</div>
              <div class="option text-center ${containsImage ? 'center' : 'overflow-auto'}">${options[1]}</div>
              <div class="option text-center ${containsImage ? 'center' : 'overflow-auto'}">${options[2]}</div>
              `;
}

export async function getAllOptions(questionEnum, cardData, randomCardData) {
    var optionsArray = [];

    // Define a function to censor text within double quotes
    function censorWithinQuotes(input) {
        return input.replace(/"([^"]*)"/g, '"CENSORED"');
    }

    const censoredDesc = questionEnum === "effect" ? censorWithinQuotes(cardData.desc) : cardData.desc;

    switch (questionEnum) {
        case "attribute":
            const attribute = cardData.attribute === null || cardData.attribute === undefined ? "None" : cardData.attribute;
            optionsArray.push(attribute);
            for (var i = 0; i < 2; i++) {
                const randomAttribute = randomCardData[i].attribute === null || randomCardData[i].attribute === undefined ? "None" : randomCardData[i].attribute;
                optionsArray.push(randomAttribute);
            }
            break;
        case "level":
            const level = cardData.level === null || cardData.level === undefined ? 0 : cardData.level;
            optionsArray.push(level);
            for (var i = 0; i < 2; i++) {
                const randomLevel = randomCardData[i].level === null || randomCardData[i].level === undefined ? 0 : randomCardData[i].level;
                optionsArray.push(randomLevel);
            }
            break;
        case "effect":
            optionsArray.push(censoredDesc);
            for (var i = 0; i < 2; i++) {
                optionsArray.push(censorWithinQuotes(randomCardData[i].desc));
            }
            break;
        case "cardName":
            const name = cardData.name === null || cardData.name === undefined ? "" : cardData.name;
            optionsArray.push(name);
            for (var i = 0; i < 2; i++) {
                const randomName = randomCardData[i].name === null || randomCardData[i].name === undefined ? "" : randomCardData[i].name;
                optionsArray.push(randomName);
            }
            break;
        case "art":
            optionsArray.push(`<img src="https://fh-yugiguessr-images.s3.eu-north-1.amazonaws.com/card_images_cropped/card_images_cropped/${cardData.id}.jpg" alt=${cardData.name}>`);
            for (var i = 0; i < 2; i++) {
                optionsArray.push(`<img src="https://fh-yugiguessr-images.s3.eu-north-1.amazonaws.com/card_images_cropped/card_images_cropped/${randomCardData[i].id}.jpg" alt=${randomCardData[i].name}>`);
            }
            break;
        case "attackDef":
            const atk = cardData.atk  === null || cardData.atk === undefined ? 0 : cardData.atk;
            const def = cardData.def  === null || cardData.def === undefined ? 0 : cardData.def;
            optionsArray.push(atk + "/" + def);
            for (var i = 0; i < 2; i++) {
                const randomAtk = randomCardData[i].atk  === null || randomCardData[i].atk === undefined ? 0 : randomCardData[i].atk;
                const randomDef = randomCardData[i].def  === null || randomCardData[i].def === undefined ? 0 : randomCardData[i].def;
                optionsArray.push(randomAtk+ "/" + randomDef);
            }
            break;
        case "type":
            const race = cardData.race === null || cardData.race === undefined ? "None" : cardData.race;
            optionsArray.push(race);
            for (var i = 0; i < 2; i++) {
                const randomRace = randomCardData[i].race === null || randomCardData[i].race === undefined ? "None" : randomCardData[i].race;
                optionsArray.push(randomCardData[i].race);
            }
            break;
        default:
            break;
    }

  
    return optionsArray;
}

