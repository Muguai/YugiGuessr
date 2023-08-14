export function getRandomCardData(filterProperty = [], filterValues = [], includeFilter = true, yearRange = [], includeYear = true) {
    return fetch('card_data/card_data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch card data');
        }
        return response.json();
      })
      .then(data => {
        const cardDataArray = data.data;
  
        let filteredCards = cardDataArray;

        if (yearRange.length == 2) {
          const startYear = parseInt(yearRange[0]);
          const endYear = parseInt(yearRange[1]);
  
          if (!isNaN(startYear) && !isNaN(endYear)) {
            if (includeYear) {
              filteredCards = filteredCards.filter(card => {
                const tcgYear = parseInt(card.misc_info[0]?.tcg_date?.split('-')[0]);
                return !isNaN(tcgYear) && tcgYear >= startYear && tcgYear <= endYear;
              });
            } else {
              filteredCards = filteredCards.filter(card => {
                const tcgYear = parseInt(card.misc_info[0]?.tcg_date?.split('-')[0]);
                return isNaN(tcgYear) || tcgYear < startYear || tcgYear > endYear;
              });
            }
          }
        }

        if(filterProperty.length != 0){
          if (includeFilter) {
            filterProperty.forEach(element => {
              filteredCards = filteredCards.filter(card => filterValues.includes(card[element]));
            });
          } else {
            filterProperty.forEach(element => {
              filteredCards = filteredCards.filter(card => !filterValues.includes(card[element]));
            });
          }
        }
  
        const randomIndex = Math.floor(Math.random() * filteredCards.length);
        return filteredCards[randomIndex];
      })
      .catch(error => {
        console.error('Error fetching card data:', error);
        return null;
      });
  }

  export function compareRandom(data, randomCardsData, comparer, enumValue) {
    let result = false;
    switch (enumValue) {
      case 'attackDef':
        if (data.atk == comparer.atk && data.def == comparer.def) {
          result = true;
        }
        for (const card of randomCardsData) {
          if (card.atk == comparer.atk && card.def == comparer.def) {
            result = true;
            break;
          }
        }
        break;
      case 'cardName':
        if (data.cardName == comparer.name) {
          result = true;
        }
        for (const card of randomCardsData) {
          if (card.cardName == comparer.name) {
            result = true;
            break;
          }
        }
        break;
      case 'effect':
        if (data.desc == comparer.desc) {
          result = true;
        }
        for (const card of randomCardsData) {
          if (card.desc == comparer.desc) {
            result = true;
            break;
          }
        }
        break;
      case 'attribute':
        if (data.attribute == comparer.attribute) {
          result = true;
        }
        for (const card of randomCardsData) {
          if (card.attribute == comparer.attribute) {
            result = true;
            break;
          }
        }
        break;
      case 'level':
        if (data.level == comparer.level) {
          result = true;
        }
        for (const card of randomCardsData) {
          if (card.level == comparer.level) {
            result = true;
            break;
          }
        }
        break;
      case 'art':
        if (data.id == comparer.id) {
          result = true;
        }
        for (const card of randomCardsData) {
          if (card.id == comparer.id) {
            result = true;
            break;
          }
        }
        break;
      case 'type':
        if (data.race == comparer.race) {
          result = true;
        }
        for (const card of randomCardsData) {
          if (card.race == comparer.race) {
            result = true;
            break;
          }
        }
        break;
      case 'Spell/Trap':
        if (data.race != comparer.race) {
          result = true;
        }
        for (const card of randomCardsData) {
          if (card.race != comparer.race) {
            result = true;
            break;
          }
        }
        break;
  
      default:
        let blurOverlay = '';
        break;
    }
  
    return result;
  
  }


  export function getRandomSimiliarCard(cardType) {
    switch (cardType) {
        // Main Deck Types
        case "Effect Monster":
          return ['Effect Monster'];
        case "Flip Effect Monster":
        case "Flip Tuner Effect Monster":
        case "Gemini Monster":
        case "Normal Monster":
        case "Normal Tuner Monster":
        case "Ritual Effect Monster":
        case "Ritual Monster":
            return ['attribute', 'level', 'effect', 'cardName', 'art', 'attackDef', 'type'];

        // Spell and Trap Cards
        case "Spell Card":
        case "Trap Card":
            return ['effect', 'cardName', 'art'];

        // Extra Deck Types
        case "Fusion Monster":
        case "Synchro Monster":
        case "Synchro Tuner Monster":
            return ['attribute', 'level', 'effect', 'cardName', 'art', 'attackDef', 'type'];
        
        
        case "XYZ Monster":
        case "XYZ Pendulum Effect Monster":       
        case "Synchro Pendulum Effect Monster": 
        case "Pendulum Effect Fusion Monster":      
        case "Pendulum Effect Monster":
        case "Pendulum Effect Ritual Monster":
        case "Pendulum Flip Effect Monster":
        case "Pendulum Normal Monster":
        case "Pendulum Tuner Effect Monster":
            return ['attribute', 'level', 'cardName', 'art', 'attackDef', 'type'];

        case "Link Monster":
            return ['attribute', 'effect', 'cardName', 'art', 'attackDef', 'type'];
        // Other Types
        case "Skill Card":
            return ['cardName', 'art', 'effect'];
        case "Token":
            return ['attribute', 'level', 'cardName', 'art', 'attackDef', 'type'];

        default:
            return ['cardName', 'art'];
    }
}