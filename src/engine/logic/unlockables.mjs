import { entities } from "../objects/entities.mjs";
import { roleProficiencies } from "../objects/proficiencies.mjs";

const availableHeroes = entities.filter(entity => entity.faction === 'hero' && !entity.locked)

export function unlockProficiency() {
    console.log(availableHeroes)
    availableHeroes.forEach(hero => {
      const lockedProficiencies = roleProficiencies[hero.role].filter(proficiency => proficiency.locked);
      console.log(lockedProficiencies)
      if (lockedProficiencies.length > 0) {
        const proficiencyToUnlock = lockedProficiencies[Math.floor(Math.random() * lockedProficiencies.length)];
        proficiencyToUnlock.locked = false;
        console.log(proficiencyToUnlock)
      }
    });
  }