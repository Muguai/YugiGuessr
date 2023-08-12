
export const blurOptions = ['attribute', 'level', 'effect', 'cardName', 'art', 'attackDef', 'type', 'random'];

export function getRandomEnum(blurEnums) {
    if (blurEnums.some((Element) => Element === "random")) {
        const allButAll = blurOptions.filter(Element => Element != 'random');
        const randomIndex = Math.floor(Math.random() * allButAll.length);
        console.log("Blur option: " + allButAll[randomIndex] + " Random index: " + randomIndex);

        return allButAll[randomIndex];
    } else {
        const randomIndex = Math.floor(Math.random() * blurEnums.length);
        return blurEnums[randomIndex];
    }

}

export function getSelectedBlurOptions(selectedBlurEnums) {
    const checkboxes = document.getElementsByName('blurOption');
    const selectedOptions = [];
    //ive been switching between different options for choosing blurOptions
    /*
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.value);
        }
    });
    */
    const blurOptionSelect = document.getElementById('blurOptionSelect');
    selectedOptions.push(blurOptionSelect.value);
    return selectedBlurEnums.filter((enumValue) => selectedOptions.includes(enumValue));
}


export function getBlurEnumsByCardType(cardType) {
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

export function getBlurOverlay(enumValue) {
    let blurOverlay = '';

    switch (enumValue) {
        case 'attackDef':
            blurOverlay = `<div class="blurAttackDefOverlay"></div>`;
            break;
        case 'cardName':
            blurOverlay = `<div class="blurCardNameOverlay"></div><div class="blurEffectOverlay"></div>`;
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
