import { roleProficiencies } from "../objects/proficiencies.mjs";
import { playerConfigurations } from "./entitySelection.mjs";

export function assignProficiencies(entities) {
    return entities.map(entity => {
        // Find the player configuration for the current entity's role
        const playerConfig = playerConfigurations.find(pc => pc.role === entity.role);
        if (playerConfig) {
            // Get proficiencies array for the entity's role
            const proficiencies = roleProficiencies[entity.role];
            if (proficiencies && proficiencies.length > 0) {
                // Find the specific proficiency from roleProficiencies that matches the name specified in playerConfiguration
                const selectedProficiency = proficiencies.find(p => p.name === playerConfig.proficiency);
                if (selectedProficiency) {
                    entity.proficiency = selectedProficiency;
                }
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