import { buildDeck } from "../buildDecks.mjs";
import { actions } from "./gameLoop.mjs";

export function applyLycanthropyEffect(entity) {
  actions.push(`${entity.role} is now feral and furry`);
    let lycanthropyDeck = [
      {
        name: "scratch",
        properties: { target: 3, health: -3, shot: -1, counter: 2, aggro: 3, info: "3 damage to single target \n -1 health counters \n to single target \n aggro:3" },
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
          info: "8 damage to single target \n 3 lycanthropy counters \n to single target \n aggro:3"
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
          info: "5 damage to all enemies \n 3 -1 health counters \n to all enemies \n aggro:5"
        },
        frequency: 3,
      },
      {
        name: "monster heal",
        properties: { target: 0, health: 10, aggro: 3, info: "10 health to self  \n aggro:3" },
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
    actions.push(`${entity.role} is no longer feral and furry`);
    if (entity.isLycanthropic) {
      entity.deck = [...entity.originalDeck];
      entity.originalDeck = [];
      entity.isLycanthropic = false;
    }
  }

  export function applyVampirismEffect(entity) {
    actions.push(`${entity.role} is now pale and sparkly`);
    let vampiricDeck = [
      {
        name: "siphon life",
        properties: {
          health: -3,
          target: 3,
          aggro: 3,
          info: "3 damage to single enemy \n 3 health to self \n aggro:3"
        },
        frequency: 8
      },
      {
        name: "regenerate",
        properties: {
          target: 0,
          aggro: 2,
          health: 3,
          info: "heals self for 3 \n aggro:2"
        },
        frequency: 4
      },
      {
        name: "vanish",
        properties: {
          target: 0,
          aggro: -4,
          info: "aggro:-4 \n"
        },
        frequency: 4
      },
      {
        name: "grapple",
        properties: {
          target: 3,
          aggro: 3,
          shield: -2,
          strength: -2,
          info: "-2 shield to single enemy \n -2 strength to single enemy \n aggro:3"
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
    actions.push(`${entity.role} is no longer pale and sparkly`);
    if (entity.isVampiric) {
      entity.deck = [...entity.originalDeck];
      entity.originalDeck = [];
      entity.isVampiric = false;
    }
  }