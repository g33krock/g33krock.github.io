import { heroes, monsters } from "../entitySelection.mjs";

function shuffleEntities(entities) {
    return entities.sort(() => Math.random() - 0.5);
}

function assignIds(entities, startId) {
    return entities.map((entity, index) => ({
        ...entity,
        id: startId + index // Start ID is adjustable per entity type
    }));
}

export const heroesWithIds = assignIds(heroes, 1); // Start heroes ID from 1
export const monstersWithIds = assignIds(monsters, 1001);

export const shuffledHeroes = heroesWithIds;
export const shuffledMonsters = shuffleEntities(monstersWithIds);
