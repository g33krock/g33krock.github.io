import { roleProficiencies } from "../objects/proficiencies.mjs";

export function assignProficiencies(entities) {
    return entities.map(entity => {
        const proficiencies = roleProficiencies[entity.role];
        if (proficiencies && proficiencies.length > 0) {
            // Select a random proficiency for simplicity. You can implement other selection logic here.
            const randomIndex = Math.floor(Math.random() * proficiencies.length);
            const selectedProficiency = proficiencies[randomIndex];
            // Assign the selected proficiency to the entity
            entity.proficiency = selectedProficiency;
        }
        if (entity.proficiency.isFlameShield){
            entity.flameShield = true
        }
        if (entity.proficiency.isFrostShield){
            entity.frostShield = true
        }
        if (entity.proficiency.isArcaneShield){
            entity.arcaneShield = true
        }
        console.log(entity)
        return entity;
    });
}