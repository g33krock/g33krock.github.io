import { buildInitialDeck } from "./buildDecks.mjs";
import { entities } from "./state/stateManager.mjs";
import { cards } from "../objects/cards.mjs";
import { assignProficiencies } from "./assignProficiencies.mjs";

export let playerConfigurations = JSON.parse(localStorage.getItem('playerConfigurations') || '[]');

export const selectedHeroes = playerConfigurations.map(player => player.role);

const powerLimit = entities.filter(entity => !entity.locked && entity.faction === 'hero').reduce((acc, entity) => acc + entity.power, 0);

function selectMonsters(limit) {
    let selectedMonsters = [];

    do {
        const availableMonsters = entities.filter(e => e.faction === "monster");
        let totalPower = 0;
        selectedMonsters = []; // Reset the selected monsters list for each attempt

        while (totalPower < limit && availableMonsters.length > 0) {
            // Randomly pick a monster each time to allow duplicates
            const randomIndex = Math.floor(Math.random() * availableMonsters.length);
            const monster = availableMonsters[randomIndex];

            // Check if adding this monster exceeds the power limit
            if (totalPower + monster.power <= limit) {
                selectedMonsters.push(monster.role);
                totalPower += monster.power;
            } else {
                // If the monster cannot be added without exceeding the limit, try another one
                availableMonsters.splice(randomIndex, 1); // Remove the selected monster from the pool
            }
        }

        // The loop will rerun if no monsters were selected
    } while (selectedMonsters.length === 0 && entities.some(e => e.faction === "monster" && e.power <= limit));

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
