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
    if (entity.proficiency) {
      if (entity.proficiency.shieldAll) {
        activeFaction.forEach((e) => (e.shield = entity.proficiency.shieldAll));
      }
      if (entity.proficiency.strengthenAll) {
        activeFaction.forEach(
          (e) => (e.strengthen = entity.proficiency.strengthenAll)
        );
      }
      if (entity.proficiency.shieldSelf) {
        entity.shield = entity.proficiency.shieldSelf;
      }
      if (entity.proficiency.strengthenSelf) {
        entity.strengthen = entity.proficiency.strengthenSelf;
      }
      if (entity.proficiency.aggroModifier) {
        entity.aggro += entity.proficiency.aggroModifier;
      }
      if (entity.proficiency.flameShield) {
        entity.flameShield = true;
      }
      if (entity.proficiency.frostShield) {
        entity.frostShield = true;
      }
      if (entity.proficiency.arcaneShield) {
        entity.arcaneShield = true;
      }
      if (entity.proficiency.aggroLife) {
        entity.aggroLife = true;
      }
      if (entity.proficiency.shadow) {
        entity.shadow = true;
      }
    }
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
    let selectedCard = selectCard(drawnCards);
    console.log(`Selected Card: ${selectedCard.name}`);

    // If the selected card is "mastermind", draw 2 more cards and choose again
    if (selectedCard.name === "mastermind") {
        console.log("Mastermind effect activated. Drawing 2 more cards.");
        const additionalCards = drawCards(entity.deck, 2);
        console.log(`Additional Cards Drawn: ${additionalCards.map((card) => card.name)}`);
        
        // Since selectedCard is declared with let, it can be reassigned
        selectedCard = selectCard(additionalCards); // Choose between the newly drawn cards
        console.log(`New Selected Card: ${selectedCard.name}`);
        
        // Add back the unused cards to the deck, if applicable
        const unusedCards = additionalCards.filter(card => card !== selectedCard);
        entity.deck.push(...unusedCards); // Assuming you want to return the unused cards back to the deck
    }

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
        const aggroA =
          a.aggro +
          (a.monsterSpecificAggro || 0) +
          Math.floor(Math.random() * 20 + 1);
        const aggroB =
          b.aggro +
          (b.monsterSpecificAggro || 0) +
          Math.floor(Math.random() * 20 + 1);
        return aggroB - aggroA;
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

function adjustCardEffectsBasedOnProficiency(entity, card) {
  let adjustedCard = JSON.parse(JSON.stringify(card));

  // Apply proficiency adjustments
  if (entity.proficiency) {
    if (
      entity.proficiency.damageModifier &&
      adjustedCard.properties.health < 0
    ) {
      adjustedCard.properties.health -= entity.proficiency.damageModifier;
    }
    if (entity.proficiency.healModifier && adjustedCard.properties.health > 0) {
      adjustedCard.properties.health += entity.proficiency.healModifier;
    }
    if (entity.proficiency && entity.proficiency.additionalCounters) {
      adjustedCard.properties.counter += entity.proficiency.additionalCounters;
    }
  }
  console.log(adjustedCard)
  console.log(entity.proficiency)
  return adjustedCard;
}

function applyDirectEffects(selectedCard, target, entity) {
  console.log(`Aggro: ${entity.aggro}`);
  const adjustedCard = adjustCardEffectsBasedOnProficiency(
    entity,
    selectedCard
  );

  const applyEffects = (adjustedCard, targetEntity, actingEntity) => {
    console.log(
      `Applying effects from ${adjustedCard.name} to ${
        targetEntity.role || "entity"
      }. Initial state:`,
      {
        health: targetEntity.health,
        shield: targetEntity.shield,
        strengthen: targetEntity.strengthen,
        effects: targetEntity.effects,
      }
    );

    // Handling for damage
    if (adjustedCard.properties.health < 0) {
      let damageAmount = adjustedCard.properties.health;
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
      if (adjustedCard.name === "siphon life") {
        actingEntity.health -= damageAmount; // Heal the acting entity
        if (actingEntity.health > actingEntity.initialHealth) {
          actingEntity.health = actingEntity.initialHealth; // Cap at initial health
        }
      }
    } else if (adjustedCard.properties.health > 0) {
      // Handling for healing
      const potentialHealth =
        targetEntity.health + adjustedCard.properties.health;
      targetEntity.health =
        potentialHealth > targetEntity.initialHealth
          ? targetEntity.initialHealth
          : potentialHealth;
    }

    // Apply shield and strengthen effects
    if (adjustedCard.properties.shield) {
      targetEntity.shield += adjustedCard.properties.shield;
    }
    if (adjustedCard.properties.strengthen) {
      targetEntity.strengthen += adjustedCard.properties.strengthen;
    }

    console.log(
      `Applied effects from ${adjustedCard.name} to ${
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
    target.forEach((singleTarget) => {
      applyEffects(adjustedCard, singleTarget, entity);
    });
  } else {
    console.log("Target is a single entity, applying effects.");
    applyEffects(adjustedCard, target, entity);
  }

  if (selectedCard.name === "flurry") {
    const nextTwoCards = drawCards(entity.deck, 2); // Draw the next two cards for flurry

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
          applyEffectOverTimeTokens(adjustedNextCard, singleTarget)
        ); // Apply effects to each target in the array
      } else {
        applyEffects(adjustedNextCard, currentTarget, entity);
        applyEffectOverTimeTokens(adjustedNextCard, currentTarget);
      }
    });
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
