import { buildDeck } from "../buildDecks.mjs";

export function applyLycanthropyEffect(entity) {
    let lycanthropyDeck = [
      {
        name: "scratch",
        properties: { target: 3, health: -3, shot: -1, counter: 2, aggro: 3 },
        frequency: 6,
      },
      {
        name: "lycanthropic bite",
        properties: {
          target: 3,
          health: -8,
          aggro: 3,
          counter: 3,
          lycanthropy: 1,
        },
        frequency: 5,
      },
      {
        name: "swipe",
        properties: {
          target: 5,
          health: -3,
          shot: -1,
          stot: -1,
          counter: 2,
          aggro: 5,
        },
        frequency: 3,
      },
      {
        name: "monster heal",
        properties: { target: 0, health: 10, aggro: 3 },
        frequency: 1,
      },
    ];
    if (!entity.isLycanthropic) {
      entity.originalDeck = [...entity.deck];
      entity.deck = buildDeck(lycanthropyDeck);
      entity.isLycanthropic = true;
    }
  }
  
  export function revertLycanthropyEffect(entity) {
    if (entity.isLycanthropic) {
      entity.deck = [...entity.originalDeck];
      entity.originalDeck = [];
      entity.isLycanthropic = false;
    }
  }

  export function applyVampirismEffect(entity) {
    let vampiricDeck = [
      {
        name: "siphon life",
        properties: {
          health: -3,
          target: 3,
          aggro: 3,
        },
        frequency: 8
      },
      {
        name: "bandage",
        properties: {
          target: 0,
          aggro: 2,
          health: 3,
        },
        frequency: 4
      },
      {
        name: "shield",
        properties: {
          target: 0,
          aggro: 2,
          shield: 2,
        },
        frequency: 4
      },
      {
        name: "grapple",
        properties: {
          target: 3,
          aggro: 3,
          health: 3,
        },
        frequency: 4
      },
    ];
    if (!entity.isVampiric) {
      entity.originalDeck = [...entity.deck];
      entity.deck = buildDeck(vampiricDeck);
      entity.isVampiric = true;
    }
    console.log(entity)
  }
  
  export function revertVampirismEffect(entity) {
    if (entity.isVampiric) {
      entity.deck = [...entity.originalDeck];
      entity.originalDeck = [];
      entity.isVampiric = false;
    }
  }