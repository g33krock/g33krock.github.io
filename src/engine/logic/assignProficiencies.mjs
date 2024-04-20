import { roleProficiencies } from "../objects/proficiencies.mjs";
import { playerConfigurations } from "./entitySelection.mjs";

export function assignProficiencies(entities) {
    // Iterate through each entity to assign proficiencies
    return entities.map(entity => {
        console.log(entity)
        // Match the entity with its configuration based on an identifier or additional logic
        const playerConfig = playerConfigurations.find(pc => pc.id === entity.id); // Assuming entity.id needs to match pc.id

        if (playerConfig) {
            // Retrieve proficiencies specific to the role defined in the matched configuration
            const proficiencies = roleProficiencies[entity.role];
            // Find the specific proficiency from roleProficiencies that matches the name specified in the matched configuration
            const selectedProficiency = proficiencies.find(p => p.name === playerConfig?.proficiency);

            if (selectedProficiency) {
                entity.proficiency = selectedProficiency;
            }
        }

        // Assign boolean properties based on the selected proficiency
        if (entity.proficiency) {
            entity.flameShield = !!entity.proficiency.isFlameShield;
            entity.frostShield = !!entity.proficiency.isFrostShield;
            entity.arcaneShield = !!entity.proficiency.isArcaneShield;
            entity.shadowForm = !!entity.proficiency.isShadow;
            entity.aggroLife = !!entity.proficiency.isAggroLife;
        }

        return entity;
    });
}