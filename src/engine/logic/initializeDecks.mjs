// import necessary modules and methods
import { entities } from "../objects/entities.mjs";
import { buildInitialDeck } from "./buildDecks.mjs";
import { assignProficiencies } from "./assignProficiencies.mjs";
import { cards } from "../objects/cards.mjs";

// Initializes the decks for heroes
export function initializeHeroDeck() {
    const heroEntities = entities.filter(e => e.faction === "hero");
    const heroesWithDecks = heroEntities.map(hero => buildInitialDeck(hero, cards));
    const heroes = assignProficiencies(heroesWithDecks);
    return heroes;
}

// Initializes the decks for monsters
export function initializeMonsterDeck() {
    const monsterEntities = entities.filter(e => e.faction === "monster");
    const monstersWithDecks = monsterEntities.map(monster => buildInitialDeck(monster, cards));
    const monsters = assignProficiencies(monstersWithDecks);
    return monsters;
}
