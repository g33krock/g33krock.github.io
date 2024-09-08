import { shuffleArray } from "./shuffleDeck.mjs";


export function buildInitialDeck(entity, cards) {
  console.log(entity)
  if (!entity.defaultDeck) return;

  entity.deck = [];

  entity.defaultDeck.forEach((deckItem) => {
    const { cardName, frequency } = deckItem;
    const card = cards.find((c) => c.name === cardName);

    if (card) {
      for (let i = 0; i < frequency; i++) {
        entity.deck.push({ ...card });
      }
    }
  });
  entity.deck = shuffleArray(entity.deck);
  return entity;
}

export function buildDeck(cards) {
  let deck = [];
  cards.forEach((card) => {
    for (let i = 0; i < card.frequency; i++) {
      deck.push({ ...card });
    }
  });
  return shuffleArray(deck); 
}
