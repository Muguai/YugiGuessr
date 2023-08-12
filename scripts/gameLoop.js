import { chosenEndYear, chosenStartYear } from "./InitializeHtml.js";
import { generateRandomCard } from "./generateCard.js";
import { handleOptionClick } from "./optionsUtils.js";

export let questionNum = 1;

function startGame() {
    const gameSettingsContainer = document.getElementById('gameSettingsContainer');
    gameSettingsContainer.style.top = '200%';
    questionNum = 1;
    gameLoop();

}

async function gameLoop() {
    await generateRandomCard();
    console.log("hejho");


    setTimeout(() => {
        const options = document.getElementsByClassName("option");
        for (let i = 0; i < options.length; i++) {
            console.log("Hehe")

            options[i].addEventListener("click", () => {
                const isCorrect = handleOptionClick(options[i]);

                if(isCorrect){
                    setTimeout(() => {
                        questionNum += 1;
                        gameLoop();
                    }, 1000);
                }else{
                    setTimeout(() => {
                        endOfGame();
                    }, 1000);
                }
            });
        }
    }, 1700);


}

async function endOfGame(){
    console.log("endgame");

    const existingCard = document.getElementById('spawnedContainer');
    const existingOption = document.getElementById('optionsContainID');
    const cardContainerBefore = document.getElementById('cardContainer');


    if (existingCard) {
        existingCard.style.left = '-50%';
        existingOption.style.transition = "right 0.6s ease";
        existingOption.style.right = '-50%';
        await new Promise((resolve) => setTimeout(resolve, 500));
        cardContainerBefore.removeChild(existingCard);
        cardContainerBefore.removeChild(existingOption);
    }


    // Display the final score on the game over screen
    const scoreValueElement = document.getElementById('scoreValue');
    scoreValueElement.textContent = questionNum - 1;

    const yearRangeValueElement = document.getElementById('yearRangeValue');
    yearRangeValueElement.textContent = `${chosenStartYear} - ${chosenEndYear}`;
    /*
    const checkboxes = document.getElementsByName('blurOption');
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            bluredValue = checkbox.value;
        }
    });
    */
    const blurOptionSelect = document.getElementById('blurOptionSelect');
    let bluredValue = blurOptionSelect.value;
   
    const blurValueElement = document.getElementById('blurValue');
    blurValueElement.textContent = bluredValue;

    // Show the game over screen
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.opacity = "1";
    gameOverScreen.style.pointerEvents = 'all';


    // Handle the continue button click
    const continueButton = document.getElementById('continueButton');
    continueButton.addEventListener('click', () => {
        // Hide the game over screen
        gameOverScreen.style.opacity = "0";
        gameOverScreen.style.pointerEvents = 'none';


        // Move up the game settings
        const gameSettingsContainer = document.getElementById('gameSettingsContainer');
        gameSettingsContainer.style.top = '50%';
        // Your other logic for continuing the game
        // ...
    });
}


const startButton = document.getElementById('startGameButtonID');
startButton.addEventListener('click', startGame);