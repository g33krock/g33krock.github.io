//gameUI.mjs
import {
  checkAndProgressRound,
  getGameState,
  startNextRound,
} from "../engine/logic/gameplay/gameLoop.mjs";

import {
  applyDirectEffects,
  applyEffectOverTimeTokens,
  drawCards,
  adjustAggro,
  processReactions,
  removeDefeatedMonsters,
} from "../engine/logic/gameplay/playTurns.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateUI(); // Initial UI update
});

export async function updateUI() {
  const {
    roundCounter,
    winner,
    heroes,
    monsters,
    actions = [],
  } = getGameState();

  console.log('updating UI')
  updateGameInfo(roundCounter, winner); // Assuming synchronous
  displayEntities([...heroes, ...monsters]); // Assuming synchronous
  displayActions(actions); // Assuming synchronous

  // Async loop to handle hero updates
  for (const hero of heroes) {
    const heroDiv = document.getElementById(`entity-${hero.id}`);
    if (!heroDiv) continue; // Skip if the hero div is not found
    const deckVisualDiv = heroDiv.querySelector(".deck-visual");
    if (!deckVisualDiv) continue; // Skip if deck visual is not found

    // Handling CSS class changes potentially could be async if animations or transitions need to complete
    if (hero.turnTaken) {
      deckVisualDiv.classList.add("turn-taken");
    } else {
      deckVisualDiv.classList.remove("turn-taken");
    }
  }

  // If you need to wait for any asynchronous operations to complete
  // you can use await with a promise here. For example:
  await new Promise((resolve) => setTimeout(resolve, 0)); // Simulate async behavior if needed
}

function updateGameInfo(round, winner) {
  document.getElementById("roundCounter").textContent = `Round: ${round}`;
  document.getElementById("winner").textContent = winner
    ? `${winner} wins!`
    : "";
}

function displayEntities(entities) {
  const heroesContainer = document.getElementById("heroes");
  const monstersContainer = document.getElementById("monsters");
  heroesContainer.innerHTML = "";
  monstersContainer.innerHTML = "";

  entities.forEach((entity, index) => {
    // Main entity container
    const entityDiv = document.createElement("div");
    entityDiv.classList.add("entity");
    entityDiv.setAttribute("data-faction", entity.faction);
    entityDiv.setAttribute("data-id", entity.id);
    entityDiv.id = `entity-${entity.id}`;
    entityDiv.style.display = "flex";
    entityDiv.style.flexDirection = "column";
    entityDiv.style.alignItems = "center";
    entityDiv.style.justifyContent = "flex-start";

    // Entity name and role
    const nameDiv = document.createElement("div");
    nameDiv.innerHTML = `<strong>${entity.proficiency.name || ""} ${
      entity.role
    }</strong>`;
    entityDiv.appendChild(nameDiv);

    // Stats with icons
    const statsDiv = document.createElement("div");
    statsDiv.innerHTML = `
        <div style="margin-right:5px"><img src="../../images/icons/health.ico" alt="Health" class="icon" style="margin-right: -2px"><span style="margin-right: 2px">${entity.health} </span></div>
        <div style="margin-right:5px"><img src="../../images/icons/shield.ico" alt="Shield" class="icon" style="margin-right: -2px"><span style="margin-right: 2px">${entity.shield} </span></div>
        <div style="margin-right:5px"><img src="../../images/icons/strengthen.ico" alt="Strength" class="icon" style="margin-right: -2px"><span style="margin-right: 2px">${entity.strengthen} </span></div>
        <div style="margin-right:5px"><img src="../../images/icons/aggro.ico" alt="Aggro" class="icon" style="margin-right: -2px"><span style="margin-right: 2px">${entity.aggro} </span></div>
      `;
    entityDiv.appendChild(statsDiv);

    // Deck visuals
    const deckVisualDiv = createDeckVisual(entity);
    entityDiv.appendChild(deckVisualDiv);

    // Drawn cards and effects visuals
    const drawnCardsDiv = createDrawnCardsVisual(entity);
    const effectsDiv = createEffectsVisual(entity);
    entityDiv.appendChild(drawnCardsDiv);
    entityDiv.appendChild(effectsDiv);

    // Append to appropriate container
    if (entity.faction === "hero") {
      heroesContainer.appendChild(entityDiv);
    } else {
      monstersContainer.appendChild(entityDiv);
    }
  });
}

function createDeckVisual(entity, index) {
  const deckVisualDiv = document.createElement("div");
  deckVisualDiv.classList.add("deck-visual");
  if (entity.faction === "hero") {
    deckVisualDiv.addEventListener("click", () => {
      if (!entity.turnTaken) {
        const drawnCards = drawCards(entity, 2, false);
        if (drawnCards.length > 0) {
          displayDrawnCards(drawnCards, entity); // Show the cards if drawn
        }
      } else {
        console.log("This hero has already taken their turn.");
      }
    });
    deckVisualDiv.style.cursor = "pointer";
  }
  for (let i = 0; i < Math.min(3, entity.deck.length); i++) {
    const cardVisualDiv = document.createElement("div");
    cardVisualDiv.classList.add("card-visual");
    cardVisualDiv.style.transform = `rotate(${(i - 1) * 5}deg)`;
    cardVisualDiv.style.position = "absolute";
    cardVisualDiv.style.left = `${i * 5}px`;
    cardVisualDiv.style.backgroundImage = `url('../../images/${entity.role}.png')`;
    cardVisualDiv.style.backgroundColor = `black`;
    cardVisualDiv.style.width = "70px";
    cardVisualDiv.style.height = "100px";
    deckVisualDiv.appendChild(cardVisualDiv);
  }
  return deckVisualDiv;
}

export function displayDrawnCards(cards, entity) {
  console.log(entity);
  const drawSelectCardArea = document.getElementById("drawSelectCard");
  drawSelectCardArea.innerHTML = "";
  cards.forEach((card, cardIndex) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = card.name;
    cardDiv.style.color = "white";
    cardDiv.style.width = "150px";
    cardDiv.style.height = "200px";
    cardDiv.style.backgroundImage = `url('../../images/${card.name}.png')`;
    cardDiv.style.backgroundSize = "contain";
    cardDiv.style.backgroundRepeat = "no-repeat";
    cardDiv.addEventListener("click", () => {
      requestTargetSelection(entity, card);
    });
    drawSelectCardArea.appendChild(cardDiv);
  });
}

function createDrawnCardsVisual(entity) {
  const drawnCardsDiv = document.createElement("div");
  drawnCardsDiv.classList.add("drawn-cards");
  entity.drawnCards.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    cardDiv.textContent = card.name;
    drawnCardsDiv.appendChild(cardDiv);
  });
  return drawnCardsDiv;
}

function requestTargetSelection(entity, card) {
  const gameState = getGameState();
  const allEntities = [...gameState.heroes, ...gameState.monsters];
  let potentialTargets = [];

  // Adjust targeting if shadowForm is active to prevent damaging own team
  if (
    entity.shadowForm &&
    (card.properties.health > 0 || card.properties.hot > 0)
  ) {
    // actions.push(
    //   `${entity.role} in shadowform corrupts ${card.name} to deal shadow damage instead of healing`
    // );
    switch (card.properties.target) {
      case 2: // Originally targeting own faction for positive effect, now target opposing faction
        card.properties.target = 3;
        break;
      case 4: // Originally targeting all allies, now target all enemies
        card.properties.target = 5;
        break;
    }
  }

  switch (card.properties.target) {
    case 0: // Target self
      executeCardAction(entity, card, entity);
      break;
    case 1: // Any entity
      potentialTargets = document.querySelectorAll(".entity");
      break;
    case 2: // Own faction
      potentialTargets = document.querySelectorAll(
        `.entity[data-faction="${entity.faction}"]`
      );
      break;
    case 3: // Opposite faction
      potentialTargets = document.querySelectorAll(
        `.entity:not([data-faction="${entity.faction}"])`
      );
      break;
    case 4: // All own faction
      allEntities
        .filter((e) => e.faction === entity.faction)
        .forEach((e) => executeCardAction(entity, card, e));
      break;
    case 5: // All opposite faction
      allEntities
        .filter((e) => e.faction !== entity.faction)
        .forEach((e) => executeCardAction(entity, card, e));
      break;
    case 6: // All entities
      allEntities.forEach((e) => executeCardAction(entity, card, e));
      break;
    default:
      console.error("Invalid target type:", card.properties.target);
      return;
  }

  if ([1, 2, 3].includes(card.properties.target)) {
    potentialTargets.forEach((target) => {
      target.classList.add("highlight-target");
      target.addEventListener(
        "click",
        function targetSelectionHandler() {
          const targetId = parseInt(target.getAttribute("data-id"), 10);
          const targetEntity = allEntities.find((e) => e.id === targetId);
          executeCardAction(entity, card, targetEntity);
          processReactions(card, targetEntity, entity);
          clearDrawnCardsAndResetDeck(entity);
          document.querySelectorAll(".highlight-target").forEach((t) => {
            t.classList.remove("highlight-target");
            t.removeEventListener("click", targetSelectionHandler);
          });
        },
        { once: true }
      );
    });
  } else {
    if (card.name === "mastermind") {
      const mastermindCards = drawCards(entity, 2, true);
      console.log(mastermindCards);
      console.log(entity);
      displayDrawnCards(mastermindCards, entity);
    } else {
      clearDrawnCardsAndResetDeck(entity);
      document.querySelectorAll(".highlight-target").forEach((t) => {
        t.classList.remove("highlight-target");
        t.removeEventListener("click", targetSelectionHandler);
      });
    }
  }
}

function clearDrawnCardsAndResetDeck(entity) {
  const drawSelectCardArea = document.getElementById("drawSelectCard");
  drawSelectCardArea.innerHTML = ""; // Clear drawn cards area
  entity.deck.push(...entity.drawnCards); // Return cards to the bottom of the deck
  entity.drawnCards = []; // Clear drawn cards
}

async function executeCardAction(origin, card, target) {
  console.log(card);
  console.log(target);
  console.log(origin);
  adjustAggro(origin, card, target);
  applyDirectEffects(card, target, origin);

  // Pause for 1.5 seconds
  await new Promise(resolve => setTimeout(resolve, 1500));

  removeDefeatedMonsters();
  updateUI();
  if (card.name === "mastermind") {
    const mastermindCards = drawCards(origin, 2, true);
    console.log(mastermindCards);
    console.log(origin);
    displayDrawnCards(mastermindCards, origin);
  } else {
    checkAndProgressRound();
  }
}

function createEffectsVisual(entity) {
  const effectsDiv = document.createElement("div");
  effectsDiv.classList.add("effects");

  entity.effects.forEach((effect) => {
    // Create a container for each effect type
    const effectTypeDiv = document.createElement("div");
    effectTypeDiv.classList.add("effect-type");
    effectsDiv.appendChild(effectTypeDiv);

    // Create tokens based on the number of counters
    for (let i = 0; i < effect.counter; i++) {
      const effectTokenDiv = document.createElement("span");
      effectTokenDiv.classList.add("effect-token");

      // Assign color classes based on the effect type and value
      if (effect.value > 0) {
        effectTokenDiv.classList.add("effect-token", effect.type, "positive");
      } else if (effect.value < 0) {
        effectTokenDiv.classList.add("effect-token", effect.type, "negative");
      }

      // You might want to show the value inside the token
      effectTokenDiv.textContent = effect.value;
      effectTypeDiv.appendChild(effectTokenDiv);
    }
  });
  return effectsDiv;
}

function displayActions(actions) {
  const actionsContainer = document.getElementById("actions");
  actionsContainer.innerHTML = "";
  actions.forEach((action) => {
    const actionDiv = document.createElement("div");
    actionDiv.textContent = action;
    actionsContainer.appendChild(actionDiv);
  });
}

document.getElementById("nextRound").addEventListener("click", () => {
  startNextRound();
  updateUI();
});
