import { entities as initialEntities } from "../../objects/entities.mjs";
import { proficiencies as initialProficiencies } from "../../objects/proficiencies.mjs";

// Initialize from local storage or use initial values
export let entities = JSON.parse(localStorage.getItem('entities')) || [...initialEntities];
export let roleProficiencies = JSON.parse(localStorage.getItem('roleProficiencies')) || {...initialProficiencies};


export function saveToLocalStorage() {
    return new Promise((resolve, reject) => {
        try {
            localStorage.setItem('entities', JSON.stringify(entities));
            localStorage.setItem('roleProficiencies', JSON.stringify(roleProficiencies));
            resolve();  // Resolve when complete
        } catch (error) {
            reject(error);  // Reject on error
        }
    });
}

saveToLocalStorage()

export function unlockProficiency() {
    const availableHeroes = entities.filter(entity => entity.faction === 'hero' && !entity.locked);
    availableHeroes.forEach(hero => {
        const lockedProficiencies = roleProficiencies[hero.role].filter(proficiency => proficiency.locked);
        if (lockedProficiencies.length > 0) {
            const proficiencyToUnlock = lockedProficiencies[Math.floor(Math.random() * lockedProficiencies.length)];
            proficiencyToUnlock.locked = false;
            console.log(proficiencyToUnlock)
            saveToLocalStorage();  // Save changes to local storage
        }
    });
}

export function unlockHero() {
    const lockedHeroes = entities.filter(entity => entity.faction === 'hero' && entity.locked);
    if (lockedHeroes.length > 0){
        lockedHeroes[0].locked = false
    }
    saveToLocalStorage();
}

export function increasePower() {
    const heroes = entities.filter(entity => entity.faction === 'hero');
    heroes.forEach(hero => {
        hero.power++
    })
    saveToLocalStorage();
}

export function resetGame() {
    return new Promise((resolve, reject) => {
        try {
            entities = [...initialEntities];
            roleProficiencies = {...initialProficiencies};
            saveToLocalStorage();
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

export function getProficiencies() {
    const proficienciesJSON = localStorage.getItem('roleProficiencies');
    return proficienciesJSON ? JSON.parse(proficienciesJSON) : null;
}

// Function to get entities from Local Storage
export function getEntities() {
    const entitiesJSON = localStorage.getItem('entities');
    return entitiesJSON ? JSON.parse(entitiesJSON) : null;
}