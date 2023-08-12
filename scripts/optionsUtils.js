import { questionNum } from "./gameLoop.js";
import { correctAnswer } from "./generateCard.js";


export function handleOptionClick(option) {
    // Reset the color of all options
    var options = document.getElementsByClassName("option");
    for (var i = 0; i < options.length; i++) {
        options[i].style.backgroundColor = "#e0e0e0";
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
            option.style.border = "4px solid green";
            return true;
        } else {
            for (var i = 0; i < options.length; i++) {
                const imgString = options[i].querySelector('img').outerHTML;
                const matchSRC2 = imgString.match(/src="([^"]+)"/)[1];
                if (matchSRC2 == correctAnswerAltered)
                    options[i].style.border = "4px solid green"
            }

            console.log()
            option.style.border = "4px solid red";
            return false;
        }
    }

    //console.log("This is the selected text " + selectedOptionText);

    if (selectedOptionText == correctAnswer) {
        option.style.border = "4px solid green";
        return true;
    } else {
        for (var i = 0; i < options.length; i++) {
            if (options[i].textContent == correctAnswer)
                options[i].style.border = "4px solid green";
        }
        //options[correctAnswer].style.border = "4px solid green";
        console.log()
        option.style.border = "4px solid red";
        return false;

    }

    
    //console.log("Selected option index:", selectedOptionIndex);
}

export function makeOptions(optionsContainer, options, containsImage) {
    optionsContainer.innerHTML = `
              <h3>Question ${questionNum}</h3>
              <div class="option ${containsImage ? 'center' : 'overflow-auto'}">${options[0]}</div>
              <div class="option ${containsImage ? 'center' : 'overflow-auto'}">${options[1]}</div>
              <div class="option ${containsImage ? 'center' : 'overflow-auto'}">${options[2]}</div>
              `;

    const optionElements = optionsContainer.querySelectorAll('.option');
    optionElements.forEach(option => {
        option.addEventListener('click', () => handleOptionClick(option));
    });
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
            optionsArray.push(cardData.attribute);
            for (var i = 0; i < 2; i++) {
                optionsArray.push(randomCardData[i].attribute);
            }
            break;
        case "level":
            optionsArray.push(cardData.level);
            for (var i = 0; i < 2; i++) {
                optionsArray.push(randomCardData[i].level);
            }
            break;
        case "effect":
            optionsArray.push(censoredDesc);
            for (var i = 0; i < 2; i++) {
                optionsArray.push(censorWithinQuotes(randomCardData[i].desc));
            }
            break;
        case "cardName":
            optionsArray.push(cardData.name);
            for (var i = 0; i < 2; i++) {
                optionsArray.push(randomCardData[i].name);
            }
            break;
        case "art":
            optionsArray.push(`<img src="https://fh-yugiguessr-images.s3.eu-north-1.amazonaws.com/card_images_cropped/card_images_cropped/${cardData.id}.jpg" alt=${cardData.name}>`);
            for (var i = 0; i < 2; i++) {
                optionsArray.push(`<img src="https://fh-yugiguessr-images.s3.eu-north-1.amazonaws.com/card_images_cropped/card_images_cropped/${randomCardData[i].id}.jpg" alt=${randomCardData[i].name}>`);
            }
            break;
        case "attackDef":
            optionsArray.push(cardData.atk + "/" + cardData.def);
            for (var i = 0; i < 2; i++) {
                optionsArray.push(randomCardData[i].atk + "/" + randomCardData[i].def);
            }
            break;
        case "type":
            optionsArray.push(cardData.race);
            for (var i = 0; i < 2; i++) {
                optionsArray.push(randomCardData[i].race);
            }
            break;
        default:
            break;
    }

    return optionsArray;
}

