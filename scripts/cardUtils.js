export function getRandomCardData(filterProperty, filterValues = [], includeFilter = true, yearRange = [], includeYear = true) {
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
            } else {
              filteredCards = filteredCards.filter(card => {
                const tcgYear = parseInt(card.misc_info[0]?.tcg_date?.split('-')[0]);
                return isNaN(tcgYear) || tcgYear < startYear || tcgYear > endYear;
              });
            }
          }
        }
  
        // filter by card values
        if (filterProperty != "noFilter") {
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