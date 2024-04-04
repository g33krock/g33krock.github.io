import { shuffledHeroes, shuffledMonsters } from "./shuffleEntities.mjs"; 

const heroes = shuffledHeroes;
const monsters = shuffledMonsters;

function gameplayLoop() {
    let roundCounter = 0;
    const maxRounds = 3;

    while (heroes.some(h => h.alive) && monsters.some(m => m.alive) && roundCounter < maxRounds) {
        console.log(`Round ${roundCounter + 1} Start`);
        
        playFactionTurn(heroes, monsters);
        playFactionTurn(monsters, heroes);
    
        processEndOfTurnEffects(heroes);
        processEndOfTurnEffects(monsters);

        roundCounter++;
        console.log(`Round ${roundCounter} End`);
    }

    console.log('Gameplay Loop ended after', roundCounter, 'rounds.');
}


function playFactionTurn(activeFaction, opposingFaction) {
    activeFaction.forEach(entity => {
        if (!entity.alive) return; 

        console.log(`Entity Before Role: ${entity.role}`)
        console.log(`Entity Before Health: ${entity.health}`)
        
        // Draw Phase
        const drawnCards = drawCards(entity.deck, 2);
        console.log(`Cards Drawn: ${drawnCards.map(card => card.name)}`)

        // Select Card Phase
        const selectedCard = selectCard(drawnCards);
        console.log(`Selected Card: ${selectedCard.name}`)

        // Targeting Phase
        const target = selectTarget(entity, selectedCard, activeFaction, opposingFaction);
        console.log(`Target Before Role: ${target.role}`)
        console.log(`Target Before Health: ${target.health}`)

        // Aggro Phase
        adjustAggro(entity, selectedCard, target);

        // Direct Effect Phase
        applyDirectEffects(selectedCard, target);

        // Apply Effect Over Time Tokens
        applyEffectOverTimeTokens(selectedCard, target);

        // Reactions
        processReactions(target, entity);

        // Discard Cards
        discardCards(entity, drawnCards);
        console.log(`Entity After Role: ${entity.role}`)
        console.log(`Entity After Health: ${entity.health}`)
        console.log(`Target After Role: ${target.role}`)
        console.log(`Target After Health: ${target.health}`)
    });
}

function drawCards(deck, count) {
    return deck.splice(0, count);
}

function selectCard(drawnCards) {
    const randomIndex = Math.floor(Math.random() * drawnCards.length);
    return drawnCards[randomIndex];
}

function selectTarget(entity, card, activeFaction, opposingFaction) {
    switch (card.properties.target) {
        case 0:
            return entity; // Target self
        case 1:
            return [...activeFaction, ...opposingFaction][Math.floor(Math.random() * (activeFaction.length + opposingFaction.length))]; // Any entity
        case 2:
            return activeFaction[Math.floor(Math.random() * activeFaction.length)]; // Same faction
        case 3:
            return opposingFaction[Math.floor(Math.random() * opposingFaction.length)]; // Opposing faction
        case 4:
            return activeFaction; // All of the same faction
        case 5:
            return opposingFaction; // All of the opposing faction
        case 6:
            return [...activeFaction, ...opposingFaction]; // All entities
        default:
            console.error("Invalid target type:", card.target);
            return null;
    }
}

function adjustAggro(entity, selectedCard, target) {
    if (selectedCard.target === 1 && target.faction === 'monster') {
        target.monsterSpecificAggro = (target.monsterSpecificAggro || 0) + selectedCard.aggro;
    } else {
        entity.aggro += selectedCard.aggro;
    }
}

function applyDirectEffects(selectedCard, target) {
    const applyEffects = (targetEntity) => {
        console.log(`Applying effects from ${selectedCard.name} to ${targetEntity.role || 'entity'}. Initial state:`, { health: targetEntity.health, shield: targetEntity.shield, strengthen: targetEntity.strengthen });
        
        if (selectedCard.properties.health) {
            targetEntity.health += selectedCard.properties.health;
        }
        if (selectedCard.properties.shield) {
            targetEntity.shield += selectedCard.properties.shield;
        }
        if (selectedCard.properties.strengthen) {
            targetEntity.strengthen += selectedCard.properties.strengthen;
        }

    };

    if (Array.isArray(target)) {
        console.log('Target is an array, applying effects to each target.');
        target.forEach(applyEffects);
    } else {
        console.log('Target is a single entity, applying effects.');
        applyEffects(target);
    }
}

function applyEffectOverTimeTokens(selectedCard, target) {
    const effects = ['hot', 'shot', 'stot', 'reflect', 'interrupt', 'explosivePoisonTrap', 'paralyzingTrap'];
    const applyTokens = (targetEntity) => {
        effects.forEach(effect => {
            if (selectedCard.properties[effect]) {
                console.log(selectedCard.properties[effect])
                targetEntity.effects.push({ type: effect, value: selectedCard.properties[effect], counter: selectedCard.properties.counter });
            }
        });
        console.log(targetEntity.effects)
    };

    if (Array.isArray(target)) {
        target.forEach(applyTokens);
    } else {
        applyTokens(target);
    }
}



function discardCards(entity, drawnCards) {
    entity.deck.push(...drawnCards);
}

function processReactions(target, activeEntity) {
    // Check if the target is an array (for AoE attacks) or a single entity
    const targets = Array.isArray(target) ? target : [target];

    targets.forEach(targetEntity => {
        // Process 'reflect' effect
        if (targetEntity.effects.some(effect => effect.type === 'reflect')) {
            // Placeholder: Apply reflect effect logic
            console.log(`${targetEntity.role} reflects damage back to ${activeEntity.role}`);
            // Example: Reflect a fixed amount of damage back to the attacker
            activeEntity.health -= 5; // Reflect 5 damage back
        }

        // Process 'explosivePoisonTrap' effect
        if (targetEntity.effects.some(effect => effect.type === 'explosivePoisonTrap')) {
            // Placeholder: Apply explosive poison trap logic
            console.log(`${targetEntity.role} triggers an Explosive Poison Trap on ${activeEntity.role}`);
            // Example: Deal damage and apply a poison effect
            activeEntity.health -= 10; // Initial explosion damage
            applyEffectOverTimeTokens({hot: -2, counter: 3}, activeEntity); // Apply poison effect
        }

        // Process 'paralyzingTrap' effect
        if (targetEntity.effects.some(effect => effect.type === 'paralyzingTrap')) {
            // Placeholder: Apply paralyzing trap logic
            console.log(`${targetEntity.role} triggers a Paralyzing Trap on ${activeEntity.role}`);
            // Example: Skip the attacker's next turn or reduce action options
            activeEntity.paralyzed = true; // Indicate that the entity is paralyzed
        }

        // Check for shield abilities
        if (targetEntity.flameShield || targetEntity.frostShield || targetEntity.arcaneShield) {
            console.log(`${targetEntity.role} uses their shield ability against ${activeEntity.role}`);
            if (targetEntity.flameShield) {
                activeEntity.health -= 3;
            }
            if (targetEntity.flameShield) {
                activeEntity.health -= 3;
            }
            if (targetEntity.flameShield) {
                activeEntity.health -= 3;
            }
        }
        targetEntity.effects = targetEntity.effects.filter(effect => {
            if (effect.singleUse) {
                return false; 
            }
            if (effect.counter) {
                effect.counter -= 1; 
                return effect.counter > 0; 
            }
            return true; 
        });
    });
}



function processEndOfTurnEffects(faction) {
    faction.forEach(entity => {
        entity.effects.forEach(effect => {
            // Apply effect
            if (effect.health) entity.health += effect.health;
            if (effect.shield) entity.shield += effect.shield;
            if (effect.strengthen) entity.strengthen += effect.strengthen;
            
            // Decrement counter
            effect.counter -= 1;
        });

        // Remove expired effects
        entity.effects = entity.effects.filter(effect => effect.counter > 0);
    });
}

gameplayLoop();