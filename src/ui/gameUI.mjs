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
} from "../engine/logic/gameplay/playTurns.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateUI(); // Initial UI update
});

export function updateUI() {
  const {
    roundCounter,
    winner,
    heroes,
    monsters,
    actions = [],
  } = getGameState();

  updateGameInfo(roundCounter, winner);
  displayEntities([...heroes, ...monsters]);
  displayActions(actions);
  heroes.forEach((hero, index) => {
    const heroDiv = document.getElementById(`entity-${hero.id}`);
    const deckVisualDiv = heroDiv.querySelector(".deck-visual"); // Get the deck visual div
    if (hero.turnTaken) {
      deckVisualDiv.classList.add("turn-taken"); // Apply 'turn-taken' to deck visual
    } else {
      deckVisualDiv.classList.remove("turn-taken"); // Remove 'turn-taken' from deck visual
    }
  });
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
      nameDiv.innerHTML = `<strong>${entity.proficiency.name || ""} ${entity.role}</strong>`;
      entityDiv.appendChild(nameDiv);
  
      // Stats with icons
      const statsDiv = document.createElement("div");
      statsDiv.innerHTML = `
        <div><img src="../../images/icons/health.ico" alt="Health" class="icon"> ${entity.health}</div>
        <div><img src="../../images/icons/shield.ico" alt="Shield" class="icon"> ${entity.shield}</div>
        <div><img src="../../images/icons/strengthen.ico" alt="Strength" class="icon"> ${entity.strengthen}</div>
        <div><img src="../../images/icons/aggro.ico" alt="Aggro" class="icon"> ${entity.aggro}</div>
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
        const drawnCards = drawCards(entity, 2);
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

function displayDrawnCards(cards, entity) {
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
    clearDrawnCardsAndResetDeck(entity);
    document.querySelectorAll(".highlight-target").forEach((t) => {
      t.classList.remove("highlight-target");
      t.removeEventListener("click", targetSelectionHandler);
    });
  }
  checkAndProgressRound();
}

function clearDrawnCardsAndResetDeck(entity) {
  const drawSelectCardArea = document.getElementById("drawSelectCard");
  drawSelectCardArea.innerHTML = ""; // Clear drawn cards area
  entity.deck.push(...entity.drawnCards); // Return cards to the bottom of the deck
  entity.drawnCards = []; // Clear drawn cards
}

function executeCardAction(origin, card, target) {
  console.log(card);
  console.log(target);
  console.log(origin);
  adjustAggro(origin, card, target);
  applyDirectEffects(card, target, origin);
  applyEffectOverTimeTokens(card, target);
  updateUI();
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
