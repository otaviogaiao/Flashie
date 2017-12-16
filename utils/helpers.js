

export function formatNumberOfCards(deck){
    let numberOfCards = deck.cardsId.length
    return numberOfCards + (numberOfCards == 1 ? ' card' : ' cards')
}

//This function receives an object and an array of keys,
//and returns a new object without the properties that match the itens in the array
//of keys
export function removeManyKeys(obj, removeItems) {
    return {
      ...Object.keys(obj)
        .filter(item => !isInArray(item, removeItems))
        .reduce((newObj, item) => {
          return {
            ...newObj, [item]: obj[item]
          }
        }, {})
    }
  }

function isInArray(value, array) {
    return array.indexOf(value) > -1;
  }