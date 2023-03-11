import { CardType } from "../types/schemaTypes";

function nameComparer(name1:string, name2:string){
  if(name1.toUpperCase()[0] > name2.toUpperCase()[0]){
    return 1;
  }

  if(name1.toUpperCase()[0] < name2.toUpperCase()[0]){
    return -1;
  }

  return 0;
}

function rarityComparer(rarity1:string, rarity2:string){
  let weight1 = 0
  let weight2 = 0

  switch(rarity1){
    case "COMMON": {
      weight1=0
      break
    }
    case "RARE": {
      weight1=1
      break
    }
    case "EPIC": {
      weight1=2
      break
    }
    case "LEGENDARY": {
      weight1=3
      break
    }
    case "UNIQUE": {
      weight1=4
      break
    }
  }

  switch(rarity2){
    case "COMMON": {
      weight2=0
      break
    }
    case "RARE": {
      weight2=1
      break
    }
    case "EPIC": {
      weight2=2
      break
    }
    case "LEGENDARY": {
      weight2=3
      break
    }
    case "UNIQUE": {
      weight2=4
      break
    }
  }

  if(weight1 < weight2){
    return 1;
  }

  if(weight1 > weight2){
    return -1;
  }

  return 0;
}

export function sortCardsBy(allCards: CardType[], pref?: string) {
  let sortedCards:CardType[] = []

  allCards.forEach(card => {
    sortedCards = sortedCards.concat(card)
  });

  if (pref === "name") {
    sortedCards = sortedCards.sort((c1, c2) => nameComparer(c1.name, c2.name));
  }

  if (pref === "rarity") {
    sortedCards = sortedCards.sort((c1, c2) => rarityComparer(c1.rarity, c2.rarity));
  }

  return sortedCards;
}
