//buildDeck.mjs

import { shuffleArray } from "./shuffleDeck.mjs";


export function buildInitialDeck(entity, cards) {
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

// buildInitialDecks(entities, cards);
