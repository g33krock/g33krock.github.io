import { heroes, monsters } from "../entitySelection.mjs";

function shuffleEntities(entities) {
    return entities.sort(() => Math.random() - 0.5);
}

export const shuffledHeroes = shuffleEntities(heroes);
export const shuffledMonsters = shuffleEntities(monsters);
