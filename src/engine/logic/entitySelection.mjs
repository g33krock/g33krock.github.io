//entitySelection.js

import { buildInitialDeck } from "./buildDecks.mjs";
import { entities } from "../objects/entities.mjs";
import { cards } from "../objects/cards.mjs";
import { assignProficiencies } from "./assignProficiencies.mjs";

export const selectedHeroes = ['mage', 'rogue', 'druid', 'paladin'];
export const selectedMonsters = ['ogre', 'werewolf', 'werewolf'];

const heroesWithDecks = selectedHeroes.map(hero => {
    const entity = entities.find(e => e.role === hero)
    return buildInitialDeck(entity, cards)
})

const monstersWithDecks = selectedMonsters.map(monster => {
    const entity = entities.find(e => e.role === monster)
    return buildInitialDeck(entity, cards)
})

export const heroes = assignProficiencies(heroesWithDecks);

export const monsters = assignProficiencies(monstersWithDecks);
