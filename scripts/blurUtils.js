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


export function extraFiltersBasedOnBlurEnum(blurEnum) {
    switch (blurEnum) {
        // Main Deck Types
        case "level":
            return ['Spell Card', 'Trap Card', 'Link Monster', 'XYZ Monster'
            , "XYZ Pendulum Effect Monster"];
        case "attribute":
        case "attackDef":
        case "type":
            return ['Spell Card', 'Trap Card'];
        case "effect":
            return ['XYZ Monster'
            , "XYZ Pendulum Effect Monster",       
            , "Synchro Pendulum Effect Monster"
            , "Pendulum Effect Fusion Monster"      
            , "Pendulum Effect Monster"
            , "Pendulum Effect Ritual Monster"
            , "Pendulum Flip Effect Monster"
            , "Pendulum Normal Monster"
            , "Pendulum Tuner Effect Monster"]
        case "art":
        case "cardName":
            [];
        default:
            return [];
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
            blurOverlay = `<div class="blurEffectOverlay"></div><div class="blurTypeOverlay"></div><div class="blurAttributeOverlay"></div>`;
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

export function capitalizeFirstLetter(inputString) {
    if (typeof inputString !== 'string' || inputString.length === 0) {
      return inputString;
    }
  
    const firstLetter = inputString[0].toUpperCase();
    const restOfString = inputString.slice(1);
  
    return firstLetter + restOfString;
  }