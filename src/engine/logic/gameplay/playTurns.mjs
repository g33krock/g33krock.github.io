// playTurns.mjs
import { actions, checkAndProgressRound, updateEntityStatus } from "./gameLoop.mjs";
import { shuffledHeroes, shuffledMonsters } from "./shuffleEntities.mjs";
import {
  applyLycanthropyEffect,
  revertLycanthropyEffect,
  applyVampirismEffect,
  revertVampirismEffect,
} from "./formShifting.mjs";
import { displayDrawnCards, updateUI } from "../../../ui/gameUI.mjs";
import { createFloatingText } from "./actionEffects.mjs";

export let heroes = shuffledHeroes;
export let monsters = shuffledMonsters;

// Function to delay execution
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Function to animate the hop
  function animateHop(element) {
    element.style.transition = 'transform 0.2s';
    element.style.transform = 'translateY(-5px)';
  
    return new Promise(resolve => {
      setTimeout(() => {
        element.style.transform = 'translateY(0px)';
        setTimeout(resolve, 200); // Ensure resolve is called after the animation completes
      }, 200);
    });
  }
  
  export async function playMonstersTurn(activeFaction, opposingFaction) {
    for (const monster of activeFaction) {
      if (!monster.alive) continue;
  
      monster.turnTaken = false;
      applyProficiencyEffects(monster, activeFaction);
  
      if (monster.effects.some(effect => effect.type === "interrupt" && effect.counter > 0)) {
        console.log(`${monster.role} is interrupted and cannot act this turn.`);
        monster.effects.forEach(effect => {
          if (effect.type === "interrupt") effect.counter--;
          if (effect.counter === 0) {
            const index = monster.effects.indexOf(effect);
            monster.effects.splice(index, 1);
          }
        });
        await delay(1000);
        await updateUI();
        continue;
      }
  
      const elementId = `entity-${monster.id}`;
      const monsterElement = document.getElementById(elementId);
      if (monsterElement) {
        const deckVisual = monsterElement.querySelector('.deck-visual');
        await animateHop(deckVisual);
      } else {
        console.log(`No element found for ${monster.role} with ID ${monster.id}`);
      }
  
      simulateMonsterAction(monster, opposingFaction, activeFaction);
      await delay(1000);
      await updateUI();
    }
    resetShield(heroes);
    resetStrengthen(monsters);
    await updateUI();
  }
   

export function applyProficiencyEffects(entity, faction) {
  if (entity.proficiency) {
    if (entity.proficiency.shieldAll) {
      faction.forEach((e) => (e.shield += entity.proficiency.shieldAll));
    }
    if (entity.proficiency.strengthenAll) {
      faction.forEach((e) => (e.strengthen += entity.proficiency.strengthenAll));
    }
    if (entity.proficiency.shieldSelf) {
      entity.shield += entity.proficiency.shieldSelf;
    }
    if (entity.proficiency.strengthenSelf) {
      entity.strengthen += entity.proficiency.strengthenSelf;
    }
    if (entity.proficiency.aggroModifier) {
      entity.aggro += entity.proficiency.aggroModifier;
      if (entity.aggro < 0) {
        entity.aggro = 0;
      }
    }
  }
}

function simulateMonsterAction(monster, opposingFaction, activeFaction) {
  // Draw and select cards
  const drawnCards = drawCards(monster, 2, false);
  const selectedCard = selectCard(drawnCards);
  console.log(selectedCard)
  console.log(monster)
  console.log(
    `Monster ${monster.role} selected the card: ${selectedCard.name}`
  );

  // Select target based on the card properties
  const target = selectTarget(
    monster,
    selectedCard,
    opposingFaction,
    activeFaction
  );
  console.log(`Target selected: ${target.role}`);

    // Apply shaking effect to the target
    applyTargetEffect(target);


  // Apply card effects
  applyDirectEffects(selectedCard, target, monster);

  processReactions(selectedCard, target, monster);
  updateEntityStatus(monster)
  updateEntityStatus(target)

  // Update game state for the end of the monster's turn
  discardCards(monster, drawnCards);
}

export function drawCards(entity, count, flurry) {
    console.log(entity)
    if (entity.turnTaken && !flurry) {
        console.log(`${entity.role} has already taken a turn this round.`);
        return []; // Return an empty array to signify no cards drawn
    } else {
        entity.turnTaken = true; // Set turnTaken to true since cards are being drawn
        const cardsDrawn = entity.deck.splice(0, count);
        entity.deck.push(...cardsDrawn); // This line ensures that drawn cards are put back if necessary, or manage deck differently
        return cardsDrawn;
    }
}


function selectCard(drawnCards) {
  const randomIndex = Math.floor(Math.random() * drawnCards.length);
  return drawnCards[randomIndex];
}

function selectTarget(entity, card, opposingFaction, activeFaction) {  
    // Original switch logic for target selection
    switch (card.properties.target) {
      case 0:
        checkAndProgressRound();
        return entity;
      case 1:
        checkAndProgressRound();
        return [...activeFaction, ...opposingFaction][Math.floor(Math.random() * (activeFaction.length + opposingFaction.length))];
      case 2:
        checkAndProgressRound();
        return activeFaction[Math.floor(Math.random() * activeFaction.length)];
      case 3:
        checkAndProgressRound();
        // Initialize monsterSpecificAggro if not already set up
        if (!entity.monsterSpecificAggro) {
          entity.monsterSpecificAggro = {};
          opposingFaction.forEach(target => entity.monsterSpecificAggro[target.id] = 0);
        }
        // Calculate total aggro considering existing aggro, specific aggro, and a random component
        return opposingFaction.reduce((selectedTarget, currentTarget) => {
          const baseAggro = currentTarget.aggro;
          const msAggro = entity.monsterSpecificAggro[currentTarget.id] || 0; // Safe access
          const aggroVariation = Math.random() * 20;
          const totalAggro = baseAggro + msAggro + aggroVariation;
  
          if (!selectedTarget || totalAggro > selectedTarget.totalAggro) {
            return { target: currentTarget, totalAggro: totalAggro };
          }
          return selectedTarget;
        }, null)?.target;
      case 4:
        checkAndProgressRound();
        return activeFaction;
      case 5:
        checkAndProgressRound();
        return opposingFaction;
      case 6:
        checkAndProgressRound();
        return [...activeFaction, ...opposingFaction];
      default:
        checkAndProgressRound();
        console.error("Invalid target type:", card.properties.target);
        return null;
    }
  }
  
  

export function adjustAggro(entity, selectedCard, target) {
    console.log("Selected Card:", selectedCard);
    console.log("Target Entity:", target);

    // Initialize monsterSpecificAggro map if it does not exist
    if (!entity.monsterSpecificAggro) {
        entity.monsterSpecificAggro = {};
    }

    if (selectedCard.properties.target === 3) {
        // Ensure there is an initial value for the specific monster's aggro
        if (!entity.monsterSpecificAggro[target.id]) {
            entity.monsterSpecificAggro[target.id] = 0;
        }

        // Modify aggro based on the selected card's aggro property
        entity.monsterSpecificAggro[target.id] += selectedCard.properties.aggro;

        if(entity.aggroLife){
          entity.aggro += selectedCard.properties.aggro;
        }

        // Clamp the value between 0 and 20
        entity.monsterSpecificAggro[target.id] = Math.max(0, Math.min(20, entity.monsterSpecificAggro[target.id]));
    } else {
        // Adjust general aggro
        entity.aggro += selectedCard.properties.aggro;
        entity.aggro = Math.max(0, Math.min(20, entity.aggro));
    }

    console.log("Updated Aggro:", entity.monsterSpecificAggro);
}

function adjustCardEffectsBasedOnProficiency(entity, card) {
  let adjustedCard = JSON.parse(JSON.stringify(card));

  // Apply proficiency adjustments
  if (entity.proficiency) {
    if (
      entity.proficiency.damageModifier &&
      adjustedCard.properties.health < 0
    ) {
      actions.push(
        `${entity.role} increases damage on ${adjustedCard.name} with their ${entity.proficiency.name} skill`
      );
      adjustedCard.properties.health -= entity.proficiency.damageModifier;
    }
    if (entity.proficiency.healModifier && adjustedCard.properties.health > 0) {
      actions.push(
        `${entity.role} increases healing on ${adjustedCard.name} with their ${entity.proficiency.name} skill`
      );
      adjustedCard.properties.health += entity.proficiency.healModifier;
    }
    if (entity.proficiency && entity.proficiency.additionalCounters) {
      actions.push(
        `${entity.role} increases counters on ${adjustedCard.name} with their ${entity.proficiency.name} skill`
      );
      adjustedCard.properties.counter += entity.proficiency.additionalCounters;
    }
  }
  console.log(adjustedCard.name);
  console.log(entity.proficiency?.name);
  return adjustedCard;
}

export function applyTargetEffect(entity) {
  const entityElement = document.getElementById(`entity-${entity.id}`);
  if (entityElement) {
    entityElement.classList.add('shake');

    // Remove the class after the animation duration (800ms here)
    setTimeout(() => {
      entityElement.classList.remove('shake');
    }, 800);
  }
}


export function applyDirectEffects(selectedCard, target, entity) {
  console.log(`Aggro: ${entity.aggro}`);
  const adjustedCard = adjustCardEffectsBasedOnProficiency(
    entity,
    selectedCard
  );

  if (entity.shadowForm && adjustedCard.properties.health > 0) {
    actions.push(
      `${entity.role} in shadowform corrupts ${adjustedCard.name} to deal shadow damage instead of healing`
    );
    adjustedCard.properties.health *= -1;
  }

  const applyEffects = (adjustedCard, targetEntity, actingEntity) => {
    // Handling for damage
    let damageAmount = adjustedCard.properties.health;
    if (adjustedCard.properties.health < 0) {
      console.log(`Vanilla Damage: ${damageAmount}`);

      // If actingEntity has strengthen effect, modify the damage
      if (actingEntity.strengthen) {
        damageAmount -= actingEntity.strengthen;
        console.log(`Strengthened Damage: ${damageAmount}`);
      }

      // Ensure damage does not become healing if strengthen is too high
      if (damageAmount > 0) {
        damageAmount = 0;
        console.log(`Weaker Than Damage: ${damageAmount}`);
      }

      // Check if targetEntity has aggroLife proficiency before applying damage to health
      if (targetEntity?.proficiency && targetEntity?.aggroLife) {
        console.log(
          `${targetEntity.role} uses aggro to absorb damage due to Aggro Life proficiency.`
        );
        targetEntity.aggro += damageAmount;
        if (targetEntity.aggro < 0) {
          damageAmount = targetEntity.aggro; // Any remaining damage after aggro is depleted
          targetEntity.aggro = 0; // Reset aggro to 0 if it goes negative
        } else {
          damageAmount = 0; // No further damage if aggro absorbs it all
        }
      }

      // Apply shield calculations if any, before applying the final damage to health
      if (targetEntity.shield > 0) {
        const shieldAfterDamage = targetEntity.shield + damageAmount;
        if (shieldAfterDamage < 0) {
          targetEntity.health += shieldAfterDamage; // Apply remaining damage to health
          targetEntity.shield = 0; // Shield is depleted
        } else {
          targetEntity.shield = shieldAfterDamage; // Shield absorbs all the damage
        }
      } else {
        targetEntity.health += damageAmount; // Apply damage directly to health
      }

      // Special case for "siphon life"
      if (
        adjustedCard.name === "siphon life" ||
        adjustedCard.name === "vampiric bite"
      ) {
        actingEntity.health -= damageAmount; // Heal the acting entity
        if (actingEntity.health > actingEntity.initialHealth) {
          actingEntity.health = actingEntity.initialHealth; // Cap at initial health
        }
      }
      actions.push(
        `${actingEntity.role} deals ${damageAmount} damage to ${targetEntity.role}`
      );
      if(target.health <= 0) {
        target.alive === false
      }
      if (damageAmount !== 0) {
        const color = damageAmount < 0 ? 'red' : 'green'; // Negative for damage, positive for healing
        createFloatingText(targetEntity.id, damageAmount, color, adjustedCard.name);
      }
    } else if (adjustedCard.properties.health > 0) {
      // Handling for healing
      const potentialHealth =
        targetEntity.health + adjustedCard.properties.health;
      targetEntity.health =
        potentialHealth > targetEntity.initialHealth
          ? targetEntity.initialHealth
          : potentialHealth;
      actions.push(
        `${actingEntity.role} deals ${adjustedCard.properties.health} healing to ${targetEntity.role}`
      );
      if (damageAmount !== 0) {
        const color = damageAmount < 0 ? 'red' : 'green'; // Negative for damage, positive for healing
        createFloatingText(targetEntity.id, damageAmount, color, adjustedCard.name);
      }
    }
    if (targetEntity.health > targetEntity.initialHealth) {
      targetEntity.health = targetEntity.initialHealth;
    }

    // Apply shield and strengthen effects
    if (adjustedCard.properties.shield) {
      targetEntity.shield += adjustedCard.properties.shield;
      actions.push(
        `${actingEntity.role} deals ${adjustedCard.properties.shield} shield to ${targetEntity.role}`
      );
      if (adjustedCard.properties.shield) {
        const shieldText = adjustedCard.properties.shield > 0 ? '+' + adjustedCard.properties.shield : adjustedCard.properties.shield;
        const color = adjustedCard.properties.shield > 0 ? 'blue' : 'yellow';
        createFloatingText(targetEntity.id, shieldText, color, adjustedCard.name);
      }
    }
    if (targetEntity.shield > 10) {
      targetEntity.shield = 10;
    }
    if (targetEntity.shield < -10) {
      targetEntity.shield = -10;
    }
    if (adjustedCard.properties.strengthen) {
      actions.push(
        `${actingEntity.role} deals ${adjustedCard.properties.strengthen} strengthen to ${targetEntity.role}`
      );
      targetEntity.strengthen += adjustedCard.properties.strengthen;
      if (adjustedCard.properties.strengthen) {
        const strengthText = adjustedCard.properties.strengthen > 0 ? '+' + adjustedCard.properties.strengthen : adjustedCard.properties.strengthen;
        const color = adjustedCard.properties.strengthen > 0 ? 'blue' : 'yellow';
        createFloatingText(targetEntity.id, strengthText, color, adjustedCard.name);
      }
    }
    if (targetEntity.strengthen > 10) {
      targetEntity.strengthen = 10;
    }
    if (targetEntity.strengthen < -10) {
      targetEntity.strengthen = -10;
    }

    console.log(
      `Applied effects from ${adjustedCard.name} to ${
        targetEntity.role || "entity"
      }. Post state:`,
      {
        health: targetEntity.health,
        shield: targetEntity.shield,
        strengthen: targetEntity.strengthen,
        aggro: targetEntity.aggro,
        effects: targetEntity.effects,
      }
    );
  };

  if (Array.isArray(target)) {
    console.log("Target is an array, applying effects to each target.");
    target.forEach((singleTarget) => {
      applyEffects(adjustedCard, singleTarget, entity);
      applyEffectOverTimeTokens(adjustedCard, singleTarget, entity)
    });
  } else {
    console.log("Target is a single entity, applying effects.");
    console.log(adjustedCard)
    applyEffects(adjustedCard, target, entity);
    applyEffectOverTimeTokens(adjustedCard, target, entity)
  }

  if (selectedCard.name === "flurry") {
    actions.push(
      `${entity.role} activates flurry and plays their next to cards on ${target.role}`
    );
    const nextTwoCards = drawCards(entity, 2, true); // Draw the next two cards for flurry
    console.log(nextTwoCards)

    nextTwoCards.forEach((nextCard) => {
      const adjustedNextCard = adjustCardEffectsBasedOnProficiency(
        entity,
        nextCard
      ); // Adjust card effects based on proficiency
      let currentTarget =
        adjustedNextCard.properties.target === 3
          ? target
          : selectTarget(
              entity,
              adjustedNextCard,
              entity.faction,
              entity.faction
            ); // Determine the current target based on the card's properties

      if (Array.isArray(currentTarget)) {
        currentTarget.forEach(
          (singleTarget) =>
            applyEffects(adjustedNextCard, singleTarget, entity),
          applyEffectOverTimeTokens(adjustedNextCard, singleTarget, entity)
        ); // Apply effects to each target in the array
      } else {
        applyEffects(adjustedNextCard, currentTarget, entity);
        applyEffectOverTimeTokens(adjustedNextCard, currentTarget, entity);
      }
    });
  }
}

export function applyEffectOverTimeTokens(card, target, entity) {
  const targets = Array.isArray(target) ? target : [target];

  targets.forEach((targetEntity) => {
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
      "lycanthropy",
      "vampirism",
    ];

    effects.forEach((effect) => {
      if (properties[effect] !== undefined) {
        if (
          effect === "hot" &&
          entity.shadowForm &&
          properties[effect] > 0
        ) {
          console.log(
            `Converting hot effect to damage due to shadowForm for ${targetEntity.role}.`
          );
          console.log(effect);
          properties[effect] *= -1;
        }
        actions.push(
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

export function processReactions(selectedCard, target, activeEntity) {
  const targets = Array.isArray(target) ? target : [target];

  targets.forEach((targetEntity) => {
    targetEntity.effects = targetEntity.effects.filter((effect) => {
      // Existing traps and reflect reactions
      if (effect.type === "explosivePoisonTrap" && effect.counter > 0) {
        actions.push(
          `${activeEntity.role} triggers an Explosive Poison Trap and is filled with regret...`
        );
        if (activeEntity.aggroLife) {
          activeEntity.aggro -= 10;
        } else {
          activeEntity.health -= 10;
        }

        applyEffectOverTimeTokens(
          { properties: { hot: -2, counter: 3 } },
          activeEntity, activeEntity
        );
        return false;
      } else if (effect.type === "paralyzingTrap" && effect.counter > 0) {
        console.log(
          `${activeEntity.role} triggers a Paralyzing Trap on ${targetEntity.role}`
        );
        applyEffectOverTimeTokens(
          { properties: { interrupt: 1, counter: 2 } },
          activeEntity, activeEntity
        );
        return false;
      } else if (effect.type === "reflect" && effect.counter > 0) {
        console.log(
          `${targetEntity.role} reflects damage back on ${activeEntity.role}`
        );
        applyDirectEffects(selectedCard, activeEntity, targetEntity);
        return false;
      }
      return true; // Return true to keep the effect in the list if it's not processed here
    });
    handleShieldReactions(targetEntity, activeEntity);
  });
}

function handleShieldReactions(targetEntity, activeEntity) {
  if (targetEntity.faction !== activeEntity.faction) {
    if (targetEntity.flameShield) {
      console.log(
        `${targetEntity.role} activates Flame Shield against ${activeEntity.role}`
      );
      if (activeEntity.aggroLife) {
        activeEntity.aggro -= 5;
      } else {
        activeEntity.health -= 5;
      }

      applyEffectOverTimeTokens(
        { properties: { hot: -2, counter: 1 } },
        activeEntity, activeEntity
      );
    }
    if (targetEntity.frostShield) {
      console.log(
        `${targetEntity.role} activates Frost Shield against ${activeEntity.role}`
      );
      if (activeEntity.aggroLife) {
        activeEntity.aggro -= 2;
      } else {
        activeEntity.health -= 2;
      }

      applyEffectOverTimeTokens(
        { properties: { shot: 1, stot: -3, counter: 2 } },
        activeEntity, activeEntity
      );
    }
    if (targetEntity.arcaneShield) {
      console.log(
        `${targetEntity.role} activates Arcane Shield against ${activeEntity.role}`
      );
      if (activeEntity.aggroLife) {
        activeEntity.aggro -= 2;
      } else {
        activeEntity.health -= 2;
      }

      applyEffectOverTimeTokens(
        { properties: { shot: -1, counter: 2 } },
        activeEntity, activeEntity
      );
    }
  } else {
    console.log(
      `${targetEntity.role}'s shield does not activate against teammate ${activeEntity.role}.`
    );
  }
}

function discardCards(entity, drawnCards) {
  entity.deck.push(...drawnCards); // Add used cards back to the deck
}

// Exported utility functions
export function resetShield(entities) {
  entities.forEach((entity) => (entity.shield = 0));
}

export function resetStrengthen(entities) {
  entities.forEach((entity) => (entity.strengthen = 0));
}

export function processEndOfTurnEffects(faction) {
  faction.forEach((entity) => {
    let lycanthropyActive = false;
    let vampirismActive = false;

    entity.effects.forEach((effect) => {
      if (entity.aggroLife && effect.type === "hot") {
        entity.aggro += effect.value;
        if (entity.aggro > 20) {
          entity.aggro = 20;
        }
        effect.counter -= 1;
      }
      if (!entity.aggroLife && effect.type === "hot") {
        entity.health += effect.value;
        if (entity.health > entity.initialHealth) {
          entity.health = entity.initialHealth;
        }
        effect.counter -= 1;
      }
      if (effect.type === "shot") {
        entity.shield += effect.value;
        if (entity.shield > 10) {
          entity.shield = 10;
        }
        if (entity.shield < -10) {
          entity.shield = -10;
        }
        effect.counter -= 1;
      }
      if (effect.type === "stot") {
        entity.strengthen += effect.value;
        if (entity.strengthen > 10) {
          entity.strengthen = 10;
        }
        if (entity.strengthen < -10) {
          entity.strengthen = -10;
        }
        effect.counter -= 1;
      }
      if (
        effect.type === "lycanthropy" &&
        !vampirismActive &&
        !lycanthropyActive
      ) {
        entity.effects.forEach((e) => {
          if (e.type === "vampirism") {
            e.counter = 0;
          }
        });
        applyLycanthropyEffect(entity);
        lycanthropyActive = true;
        effect.counter -= 1;
        if (effect.counter <= 0) {
          revertLycanthropyEffect(entity);
          lycanthropyActive = false;
        }
      }
      if (
        effect.type === "vampirism" &&
        !vampirismActive &&
        !lycanthropyActive
      ) {
        entity.effects.forEach((e) => {
          if (e.type === "lycanthropy") {
            e.counter = 0;
          }
        });
        applyVampirismEffect(entity);
        vampirismActive = true;
        effect.counter -= 1;
        if (effect.counter <= 0) {
          revertVampirismEffect(entity);
          vampirismActive = false;
        }
      }
      if(entity.health <= 0) {
        entity.alive === false
      }
    });

    entity.effects = entity.effects.filter((effect) => effect.counter > 0);

    if (entity.isLycanthropic && !lycanthropyActive) {
      revertLycanthropyEffect(entity);
    }
    if (entity.isVampiric && !vampirismActive) {
      revertVampirismEffect(entity);
    }
  });
  removeDefeatedHeroes()
}

export function removeDefeatedHeroes() {
    heroes = heroes.filter((entity) => entity.alive);
    return heroes
  }

  export function removeDefeatedMonsters() {
    monsters = monsters.filter((entity) => entity.alive);
    return monsters
  }


