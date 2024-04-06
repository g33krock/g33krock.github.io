import { shuffledHeroes, shuffledMonsters } from "./shuffleEntities.mjs";

let heroes = shuffledHeroes;
let monsters = shuffledMonsters;

heroes.forEach((hero) => (hero.initialHealth = hero.health));
monsters.forEach((monster) => (monster.initialHealth = monster.health));

function gameplayLoop() {
  let roundCounter = 0;
  let winner = "";

  while (heroes.some((h) => h.alive) && monsters.some((m) => m.alive)) {
    console.log(`Round ${roundCounter + 1} Start`);

    playFactionTurn(heroes, monsters);
    resetShield(monsters);
    resetStrengthen(heroes);
    playFactionTurn(monsters, heroes);
    resetShield(heroes);
    resetStrengthen(monsters);

    processEndOfTurnEffects(heroes);
    processEndOfTurnEffects(monsters);

    roundCounter++;
    console.log(`Round ${roundCounter} End`);
  }
  if (heroes.some((h) => h.alive)) {
    winner = "heroes";
  } else if (monsters.some((m) => m.alive)) {
    winner = "monsters";
  } else {
    winner = "none";
  }
  console.log(`${winner} wins!`);
  console.log("Gameplay Loop ended after", roundCounter, "rounds.");
}

function playFactionTurn(activeFaction, opposingFaction) {
  activeFaction.forEach((entity) => {
    if (!entity.alive) return;
    const interruptEffectIndex = entity.effects.findIndex(
      (effect) => effect.type === "interrupt" && effect.counter > 0
    );
    if (interruptEffectIndex >= 0) {
      console.log(`${entity.role} is interrupted and cannot act this turn.`);
      entity.effects[interruptEffectIndex].counter--;

      if (entity.effects[interruptEffectIndex].counter === 0) {
        entity.effects.splice(interruptEffectIndex, 1);
      }

      return;
    }

    console.log(`Entity Before Role: ${entity.role}`);
    console.log(`Entity Before Health: ${entity.health}`);

    // Draw Phase
    const drawnCards = drawCards(entity.deck, 2);
    console.log(`Cards Drawn: ${drawnCards.map((card) => card.name)}`);

    // Select Card Phase
    const selectedCard = selectCard(drawnCards);
    console.log(`Selected Card: ${selectedCard.name}`);

    // Targeting Phase
    const target = selectTarget(
      entity,
      selectedCard,
      activeFaction,
      opposingFaction
    );
    console.log(`Target Before Role: ${target.role}`);
    console.log(`Target Before Health: ${target.health}`);

    // Aggro Phase
    adjustAggro(entity, selectedCard, target);

    // Apply Direct Effects and Process Reactions
    applyDirectEffects(selectedCard, target, entity);
    processReactions(selectedCard, target, entity);

    // After the reactions are processed, update the status of all entities involved
    if (Array.isArray(target)) {
      target.forEach(updateEntityStatus);
    } else {
      updateEntityStatus(target);
    }
    updateEntityStatus(entity); // Make sure the entity that took the action is also updated if affected by a reaction

    // Update factions immediately after these actions to ensure defeated entities are removed
    heroes = removeDefeatedEntities(heroes);
    monsters = removeDefeatedEntities(monsters);

    // Apply Effect Over Time Tokens
    applyEffectOverTimeTokens(selectedCard, target);

    // Discard Cards
    discardCards(entity, drawnCards);
    console.log(`Entity After Role: ${entity.role}`);
    console.log(`Entity After Health: ${entity.health}`);
    console.log(`Target After Role: ${target.role}`);
    console.log(`Target After Health: ${target.health}`);
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
        return entity;
      case 1:
        return [...activeFaction, ...opposingFaction][
          Math.floor(
            Math.random() * (activeFaction.length + opposingFaction.length)
          )
        ];
      case 2:
        return activeFaction[Math.floor(Math.random() * activeFaction.length)];
      case 3:
        // Sort opposing faction by aggro + monsterSpecificAggro + random factor, then select the first (highest)
        const sortedOpposing = [...opposingFaction].sort((a, b) => {
          const aggroA = a.aggro + (a.monsterSpecificAggro || 0) + Math.floor(Math.random() * 20 + 1);
          const aggroB = b.aggro + (b.monsterSpecificAggro || 0) + Math.floor(Math.random() * 20 + 1);
          return aggroB - aggroA; // Sort in descending order
          
        });
        return sortedOpposing[0];
      case 4:
        return activeFaction;
      case 5:
        return opposingFaction;
      case 6:
        return [...activeFaction, ...opposingFaction];
      default:
        console.error("Invalid target type:", card.target);
        return null;
    }
  }
  

function adjustAggro(entity, selectedCard, target) {
  if (selectedCard.properties.target === 3) {
    target.monsterSpecificAggro =
      (target.monsterSpecificAggro || 0) + selectedCard.properties.aggro;
  } else {
    entity.aggro += selectedCard.properties.aggro;
  }
}

function applyDirectEffects(selectedCard, target, entity) {
  const applyEffects = (targetEntity) => {
    console.log(
      `Applying effects from ${selectedCard.name} to ${
        targetEntity.role || "entity"
      }. Initial state:`,
      {
        health: targetEntity.health,
        shield: targetEntity.shield,
        strengthen: targetEntity.strengthen,
        effects: targetEntity.effects,
      }
    );

    if (selectedCard.properties.health) {
      // Handling for damage
      if (selectedCard.properties.health < 0) {
        let damageAmount = selectedCard.properties.health;
        console.log(`Vanilla Damage: ${damageAmount}`);

        // If entity has strengthen effect, modify the damage
        if (entity.strengthen) {
          damageAmount -= entity.strengthen; // Subtract because strengthen reduces the negative impact, or increases damage
          console.log(`Strengthened Damage: ${damageAmount}`);
        }

        // Ensure damage does not become healing if strengthen is too high
        if (damageAmount > 0) {
          damageAmount = 0;
          console.log(`Weaker Than Damage: ${damageAmount}`);
        }

        // Apply shield calculations if any, before applying the final damage to health
        if (targetEntity.shield > 0) {
          const shieldAfterDamage = targetEntity.shield + damageAmount;
          if (shieldAfterDamage < 0) {
            // Shield is completely broken, apply remaining damage to health
            targetEntity.health += shieldAfterDamage;
            console.log(`Damage After Shield: ${shieldAfterDamage}`);
            targetEntity.shield = 0; // Shield is now depleted
          } else {
            // Shield absorbs all the damage
            targetEntity.shield = shieldAfterDamage;
            console.log(`Remaining Shield: ${shieldAfterDamage}`);
          }
        } else {
          // No shield, apply damage directly to health
          targetEntity.health += damageAmount;
          console.log(`Unshielded Damage: ${damageAmount}`);
        }
        if (selectedCard.name === 'siphon life') {
            entity.health -= damageAmount; // Heal the entity
            // Ensure entity's health does not exceed its initial health
            if (entity.health > entity.initialHealth) {
              entity.health = entity.initialHealth;
            }
          }
      }
      // Handling for healing
      else if (selectedCard.properties.health > 0) {
        // Directly apply healing; strengthen does not affect healing
        const potentialHealth =
          targetEntity.health + selectedCard.properties.health;
        targetEntity.health =
          potentialHealth > targetEntity.initialHealth
            ? targetEntity.initialHealth
            : potentialHealth;
        targetEntity.health += selectedCard.properties.health;
      }
    }
    if (selectedCard.properties.shield) {
      targetEntity.shield += selectedCard.properties.shield;
    }
    if (selectedCard.properties.strengthen) {
      targetEntity.strengthen += selectedCard.properties.strengthen;
    }
    console.log(
      `Applied effects from ${selectedCard.name} to ${
        targetEntity.role || "entity"
      }. Post state:`,
      {
        health: targetEntity.health,
        shield: targetEntity.shield,
        strengthen: targetEntity.strengthen,
        effects: targetEntity.effects,
      }
    );
  };

  if (Array.isArray(target)) {
    console.log("Target is an array, applying effects to each target.");
    target.forEach(applyEffects);
  } else {
    console.log("Target is a single entity, applying effects.");
    applyEffects(target);
  }
}

function applyEffectOverTimeTokens(card, target) {
  const targets = Array.isArray(target) ? target : [target];

  targets.forEach((targetEntity) => {
    // Ensure the target entity has an effects array to push to
    if (!targetEntity.effects) {
      targetEntity.effects = [];
    }

    const { properties } = card;
    const effects = [
      "hot",
      "shot",
      "stot",
      "reflect",
      "interrupt",
      "explosivePoisonTrap",
      "paralyzingTrap",
    ];

    effects.forEach((effect) => {
      if (properties[effect] !== undefined) {
        console.log(
          `Applying ${effect}: ${properties[effect]} for ${properties.counter} turns to ${targetEntity.role}.`
        );
        targetEntity.effects.push({
          type: effect,
          value: properties[effect],
          counter: properties.counter,
        });
      }
    });

    // Optionally, filter out expired effects
    targetEntity.effects = targetEntity.effects.filter(
      (effect) => effect.counter > 0
    );
  });
}

function discardCards(entity, drawnCards) {
  entity.deck.push(...drawnCards);
}

function processReactions(selectedCard, target, activeEntity) {
  const targets = Array.isArray(target) ? target : [target];

  targets.forEach((targetEntity) => {
    targetEntity.effects = targetEntity.effects.filter((effect) => {
      if (effect.type === "explosivePoisonTrap" && effect.counter > 0) {
        console.log(
          `${activeEntity.role} triggers an Explosive Poison Trap on ${targetEntity.role}`
        );
        activeEntity.health -= 10;
        applyEffectOverTimeTokens(
          { properties: { hot: -2, counter: 3 } },
          activeEntity
        );
        return false;
      } else if (effect.type === "paralyzingTrap" && effect.counter > 0) {
        console.log(
          `${activeEntity.role} triggers a Paralyzing Trap on ${targetEntity.role}`
        );
        applyEffectOverTimeTokens(
          { properties: { interrupt: 1, counter: 2 } },
          activeEntity
        );
        return false;
      } else if (effect.type === "reflect" && effect.counter > 0) {
        console.log(
          `${targetEntity.role} reflects damage back on ${activeEntity.role}`
        );
        applyDirectEffects(selectedCard, activeEntity, target);
        return false;
      }
      return true;
    });
  });
}

function resetShield(entities) {
  entities.forEach((entity) => (entity.shield = 0));
}

function resetStrengthen(entities) {
  entities.forEach((entity) => (entity.strengthen = 0));
}

export function processEndOfTurnEffects(faction) {
  faction.forEach((entity) => {
    entity.effects.forEach((effect) => {
      if (effect.type === "hot") {
        entity.health += effect.value;
        console.log(`${effect.type}: ${effect.value}`);
      }
      if (effect.type === "shot") {
        entity.shield += effect.value;
        console.log(`${effect.type}: ${effect.value}`);
      }
      if (effect.type === "stot") {
        entity.strengthen += effect.value;
        console.log(`${effect.type}: ${effect.value}`);
      }

      effect.counter -= 1;
    });

    entity.effects = entity.effects.filter((effect) => effect.counter > 0);
  });
}

function updateEntityStatus(entity) {
  if (entity.health <= 0 && entity.alive) {
    entity.alive = false;
    console.log(`${entity.role} has been defeated.`);
  }
}

function removeDefeatedEntities(faction) {
  return faction.filter((entity) => entity.alive);
}

gameplayLoop();
