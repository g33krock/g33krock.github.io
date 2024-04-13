import { actions } from "./gameLoop.mjs";
import { shuffledHeroes, shuffledMonsters } from "./shuffleEntities.mjs";
import {
    applyLycanthropyEffect,
    revertLycanthropyEffect,
    applyVampirismEffect,
    revertVampirismEffect,
  } from "./formShifting.mjs";

export let heroes = shuffledHeroes;
export let monsters = shuffledMonsters;

export function playFactionTurn(activeFaction, opposingFaction) {
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
          if (entity.aggro < 0) {
            entity.aggro = 0;
          }
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
        console.log(
          `Additional Cards Drawn: ${additionalCards.map((card) => card.name)}`
        );
  
        // Since selectedCard is declared with let, it can be reassigned
        selectedCard = selectCard(additionalCards); // Choose between the newly drawn cards
        console.log(`New Selected Card: ${selectedCard.name}`);
  
        // Add back the unused cards to the deck, if applicable
        const unusedCards = additionalCards.filter(
          (card) => card !== selectedCard
        );
        entity.deck.push(...unusedCards); // Assuming you want to return the unused cards back to the deck
      }
  
      // Targeting Phase
      const target = selectTarget(
        entity,
        selectedCard,
        activeFaction,
        opposingFaction
      );
      console.log(`Target Before Role: ${target?.role}`);
      console.log(`Target Before Health: ${target?.health}`);
  
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
    // Adjust targeting if shadowForm is active to prevent damaging own team
    if (
      entity.shadowForm &&
      (card.properties.health > 0 || card.properties.hot > 0)
    ) {
      actions.push(
        `${entity.role} in shadowform corrupts ${card.name} to deal shadow damage instead of healing`
      );
      switch (card.properties.target) {
        case 2: // Originally targeting own faction for positive effect, now target opposing faction
          card.properties.target = 3;
          break;
        case 4: // Originally targeting all allies, now target all enemies
          card.properties.target = 5;
          break;
      }
    }
  
    // Original switch logic for target selection
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
        console.error("Invalid target type:", card.properties.target);
        return null;
    }
  }
  
  function adjustAggro(entity, selectedCard, target) {
    if (selectedCard.properties.target === 3) {
      target.monsterSpecificAggro =
        (target.monsterSpecificAggro || 0) + selectedCard.properties.aggro;
      if (target.monsterSpecificAggro > 20) {
        target.monsterSpecificAggro = 20;
      }
      if (target.monsterSpecificAggro < 0) {
        target.monsterSpecificAggro = 0;
      }
    } else {
      entity.aggro += selectedCard.properties.aggro;
      if (entity.aggro > 20) {
        entity.aggro = 20;
      }
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
  
  function applyDirectEffects(selectedCard, target, entity) {
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
  
        // Check if targetEntity has aggroLife proficiency before applying damage to health
        if (targetEntity.proficiency && targetEntity.aggroLife) {
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
      });
    } else {
      console.log("Target is a single entity, applying effects.");
      applyEffects(adjustedCard, target, entity);
    }
  
    if (selectedCard.name === "flurry") {
      actions.push(
        `${entity.role} activates flurry and plays their next to cards on ${target.role}`
      );
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
            targetEntity.shadowForm &&
            properties[effect] > 0
          ) {
            console.log(
              `Converting hot effect to damage due to shadowForm for ${targetEntity.role}.`
            );
            console.log(effect);
            effect *= -1;
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
  
  function discardCards(entity, drawnCards) {
    entity.deck.push(...drawnCards);
  }
  
  function processReactions(selectedCard, target, activeEntity) {
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
          activeEntity
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
          activeEntity
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
          activeEntity
        );
      }
    } else {
      console.log(
        `${targetEntity.role}'s shield does not activate against teammate ${activeEntity.role}.`
      );
    }
  }
  
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
      });
  
      entity.effects = entity.effects.filter((effect) => effect.counter > 0);
  
      if (entity.isLycanthropic && !lycanthropyActive) {
        revertLycanthropyEffect(entity);
      }
      if (entity.isVampiric && !vampirismActive) {
        revertVampirismEffect(entity);
      }
    });
  }
  
  export function updateEntityStatus(entity) {
    if (
      ((entity.aggroLife && entity.aggro <= 0) ||
        (!entity.aggroLife && entity.health <= 0)) &&
      entity.alive
    ) {
      entity.alive = false;
      console.log(`${entity.role} has been defeated.`);
    }
  }
  
  export function removeDefeatedEntities(faction) {
    console.log(faction)
    return faction.filter((entity) => entity.alive === true);
  }