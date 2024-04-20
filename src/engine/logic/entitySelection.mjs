import { buildInitialDeck } from "./buildDecks.mjs";
import { entities } from "../objects/entities.mjs";
import { cards } from "../objects/cards.mjs";
import { assignProficiencies } from "./assignProficiencies.mjs";

export let playerConfigurations = JSON.parse(localStorage.getItem('playerConfigurations') || '[]');

export const selectedHeroes = playerConfigurations.map(player => player.role);

const powerLimit = 3 * playerConfigurations.length;

function selectMonsters(limit) {
    const availableMonsters = entities.filter(e => e.faction === "monster");
    let totalPower = 0;
    let selectedMonsters = [];

    // Continue selecting monsters while there is power left and the pool has monsters
    while (totalPower < limit && availableMonsters.length > 0) {
        // Randomly pick a monster each time to allow duplicates
        const randomIndex = Math.floor(Math.random() * availableMonsters.length);
        const monster = availableMonsters[randomIndex];

        // Check if adding this monster exceeds the power limit
        if (totalPower + monster.power <= limit) {
            selectedMonsters.push(monster.role);
            totalPower += monster.power;
        } else {
            break; // If the monster cannot be added without exceeding the limit, stop trying
        }
    }

    return selectedMonsters;
}


export const selectedMonsters = selectMonsters(powerLimit);

const entityMap = new Map(entities.map(e => [e.role, e]));
const heroesWithDecks = selectedHeroes.map((hero, index) => {
    const entity = entityMap.get(hero);
    if (entity) {
        const clonedEntity = { ...entity, id: `entity-${index}` };
        return buildInitialDeck(clonedEntity, cards);
    }
    return null;
});

const monstersWithDecks = selectedMonsters.map(monster => {
    const entity = entities.find(e => e.role === monster);
    return buildInitialDeck(entity, cards);
});

export const heroes = assignProficiencies(heroesWithDecks);
export const monsters = assignProficiencies(monstersWithDecks);
