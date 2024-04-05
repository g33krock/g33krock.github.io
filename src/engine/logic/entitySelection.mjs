//entitySelection.js

import { buildInitialDeck } from "./buildDecks.mjs";
import { entities } from "../objects/entities.mjs";
import { cards } from "../objects/cards.mjs";

export const selectedHeroes = ['paladin', 'mage', 'rogue', 'cleric', 'warrior'];
export const selectedMonsters = ['goblin', 'werewolf', 'skeleton'];

export const heroes = selectedHeroes.map(hero => {
    const entity = entities.find(e => e.role === hero)
    console.log(entity)
    return buildInitialDeck(entity, cards)
})

export const monsters = selectedMonsters.map(monster => {
    const entity = entities.find(e => e.role === monster)
    console.log(entity)
    return buildInitialDeck(entity, cards)
})
