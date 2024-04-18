import { buildInitialDeck } from "./buildDecks.mjs";
import { entities } from "../objects/entities.mjs";
import { cards } from "../objects/cards.mjs";
import { assignProficiencies } from "./assignProficiencies.mjs";

export let playerConfigurations = JSON.parse(localStorage.getItem('playerConfigurations') || '[]');

export const selectedHeroes = playerConfigurations.map(player => player.role);

const powerLimit = 3 * playerConfigurations.length;

// Function to randomly select monsters without exceeding the power limit
function selectMonsters(limit) {
    const availableMonsters = entities.filter(e => e.faction === "monster");
    let totalPower = 0;
    let selectedMonsters = [];

    // Randomize array order
    availableMonsters.sort(() => Math.random() - 0.5);

    // Select monsters until the power limit is reached or all monsters are considered
    for (const monster of availableMonsters) {
        if (totalPower + monster.power <= limit) {
            selectedMonsters.push(monster.role);
            totalPower += monster.power;
        }
    }
    return selectedMonsters;
}

export const selectedMonsters = selectMonsters(powerLimit);

const heroesWithDecks = selectedHeroes.map(hero => {
    const entity = entities.find(e => e.role === hero);
    return buildInitialDeck(entity, cards);
});

const monstersWithDecks = selectedMonsters.map(monster => {
    const entity = entities.find(e => e.role === monster);
    return buildInitialDeck(entity, cards);
});

export const heroes = assignProficiencies(heroesWithDecks);
export const monsters = assignProficiencies(monstersWithDecks);
