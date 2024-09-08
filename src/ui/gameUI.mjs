//gameUI.mjs
import {
  checkAndProgressRound,
  getGameState,
  startNextRound,
  updateEntityStatus,
} from "../engine/logic/gameplay/gameLoop.mjs";

import {
  applyDirectEffects,
  applyEffectOverTimeTokens,
  drawCards,
  adjustAggro,
  processReactions,
  removeDefeatedMonsters,
  applyTargetEffect,
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

  console.log("updating UI");
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

  // Ensure containers exist before manipulating them
  if (!heroesContainer || !monstersContainer) {
    console.error("Heroes or Monsters container is missing in the DOM.");
    return;
  }

  // Clear the containers before repopulating them
  heroesContainer.innerHTML = "";
  monstersContainer.innerHTML = "";

  entities.forEach((entity) => {
    // Create main entity container
    const entityDiv = document.createElement("div");
    entityDiv.classList.add("entity");
    entityDiv.setAttribute("data-faction", entity.faction);
    entityDiv.setAttribute("data-id", entity.id);
    entityDiv.id = `entity-${entity.id}`;
    entityDiv.style.display = "flex";
    entityDiv.style.flexDirection = "column";
    entityDiv.style.alignItems = "center";
    entityDiv.style.justifyContent = "flex-start";
    entityDiv.style.color = "black";
    entityDiv.style.margin = "10px";
    entityDiv.style.border = "1px solid #ccc";
    entityDiv.style.borderRadius = "8px";
    entityDiv.style.padding = "10px";
    entityDiv.style.backgroundColor = "#f9f9f9";
    entityDiv.style.width = "150px";

    // Entity name and role
    const nameDiv = document.createElement("div");
    nameDiv.innerHTML = `<strong>${entity.proficiency?.name || entity.proficiency} ${
      entity.role
    }${entity.isSummon ? " (Summon)" : ""}</strong>`;
    nameDiv.style.marginBottom = "5px";
    entityDiv.appendChild(nameDiv);

    // Stats with icons
    const statsDiv = document.createElement("div");
    statsDiv.style.display = "flex";
    statsDiv.style.flexWrap = "wrap";
    statsDiv.style.justifyContent = "center";
    statsDiv.innerHTML = `
      <div style="display:flex; align-items:center; margin:2px;">
        <img src="../../images/icons/health.ico" alt="Health" class="icon" style="width:16px; height:16px; margin-right:4px;">
        <span>${entity.health}</span>
      </div>
      <div style="display:flex; align-items:center; margin:2px;">
        <img src="../../images/icons/shield.ico" alt="Shield" class="icon" style="width:16px; height:16px; margin-right:4px;">
        <span>${entity.shield}</span>
      </div>
      <div style="display:flex; align-items:center; margin:2px;">
        <img src="../../images/icons/strengthen.ico" alt="Strengthen" class="icon" style="width:16px; height:16px; margin-right:4px;">
        <span>${entity.strengthen}</span>
      </div>
      <div style="display:flex; align-items:center; margin:2px;">
        <img src="../../images/icons/aggro.ico" alt="Aggro" class="icon" style="width:16px; height:16px; margin-right:4px;">
        <span>${entity.aggro}</span>
      </div>
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
    } else if (entity.faction === "monster") {
      monstersContainer.appendChild(entityDiv);
    }
  });
}






function createDeckVisual(entity) {
  const deckVisualDiv = document.createElement("div");
  deckVisualDiv.classList.add("deck-visual");
  deckVisualDiv.style.position = "relative";
  deckVisualDiv.style.width = "100px";
  deckVisualDiv.style.height = "140px";
  deckVisualDiv.style.marginTop = "10px";
  deckVisualDiv.style.cursor = entity.faction === "hero" ? "pointer" : "default";

  // Enable card drawing for heroes
  if (entity.faction === "hero") {
    deckVisualDiv.addEventListener("click", () => {
      if (!entity.turnTaken) {
        const drawnCards = drawCards(entity, 2, false);
        if (drawnCards.length > 0) {
          displayDrawnCards(drawnCards, entity); // Show the cards if drawn
          updateUI(); // Update UI after drawing cards
        }
      } else {
        console.log("This hero has already taken their turn.");
      }
    });
  }

  // Display a stack of cards to represent the deck
  for (let i = 0; i < Math.min(3, entity.deck.length); i++) {
    const cardBackDiv = document.createElement("div");
    cardBackDiv.classList.add("card-back");
    cardBackDiv.style.transform = `rotate(${(i - 1) * 5}deg)`;
    cardBackDiv.style.position = "absolute";
    cardBackDiv.style.width = "100px";
    cardBackDiv.style.height = "140px";
    cardBackDiv.style.backgroundColor = "#444";
    cardBackDiv.style.border = "2px solid #222";
    cardBackDiv.style.borderRadius = "8px";
    cardBackDiv.style.position = "absolute";
    cardBackDiv.style.top = `${-i * 2}px`;
    cardBackDiv.style.left = `${i * 5}px`;
    cardBackDiv.style.boxShadow = "0 2px 5px rgba(0,0,0,0.3)";
    cardBackDiv.style.backgroundImage = entity.isSummon 
    ? `url('../../images/${entity.proficiency}_${entity.role}.png')` 
    : `url('../../images/${entity.role}.png')`;
    cardBackDiv.style.backgroundSize = "cover";
    cardBackDiv.style.backgroundRepeat = "no-repeat";
    deckVisualDiv.appendChild(cardBackDiv);
  }

  // Deck count
  const deckCountDiv = document.createElement("div");
  deckCountDiv.style.position = "absolute";
  deckCountDiv.style.bottom = "-20px";
  deckCountDiv.style.left = "50%";
  deckCountDiv.style.transform = "translateX(-50%)";
  deckCountDiv.style.backgroundColor = "#fff";
  deckCountDiv.style.padding = "2px 6px";
  deckCountDiv.style.borderRadius = "12px";
  deckCountDiv.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";
  deckCountDiv.style.fontSize = "14px";
  deckCountDiv.style.fontWeight = "bold";
  deckCountDiv.textContent = entity.deck.length;
  deckVisualDiv.appendChild(deckCountDiv);

  return deckVisualDiv;
}



export function displayDrawnCards(cards, entity) {
  console.log(entity);
  const drawSelectCardArea = document.getElementById("drawSelectCard");
  drawSelectCardArea.innerHTML = "";
  cards.forEach((card, cardIndex) => {
    console.log(card);
    const cardDiv = document.createElement("div");
    const cardInfo = document.createElement("p");
    cardDiv.classList.add("card");
    cardDiv.textContent = card.name;
    cardDiv.style.color = "white";
    cardDiv.style.width = "150px";
    cardDiv.style.height = "200px";
    cardDiv.style.backgroundImage = `url('../../images/${card.name}.png')`;
    cardDiv.style.backgroundSize = "contain";
    cardDiv.style.backgroundRepeat = "no-repeat";
    cardDiv.style.position = "relative";

    cardInfo.innerHTML = card.properties?.info.replace(/\n/g, '<br>');
    cardInfo.style.color = "white";
    cardInfo.style.fontSize = "12px";
    cardInfo.style.position = "absolute";
    cardInfo.style.bottom = "5px";
    cardInfo.style.width = "100%";
    cardInfo.style.textAlign = "center";

    cardDiv.appendChild(cardInfo);

    cardDiv.addEventListener("click", () => {
      if (cardDiv.classList.contains("highlight-target")) {
        cardDiv.classList.remove("highlight-target");
      } else {
        // Remove highlight from all other cards first
        const allCards = document.querySelectorAll(".card");
        allCards.forEach(c => c.classList.remove("highlight-target"));
        cardDiv.classList.add("highlight-target");
        // You may also want to handle card selection here
        requestTargetSelection(entity, card);
      }
    });

    drawSelectCardArea.appendChild(cardDiv);
  });
}

function createDrawnCardsVisual(entity) {
  const drawnCardsDiv = document.createElement("div");
  drawnCardsDiv.classList.add("drawn-cards");

  // Safely access drawnCards from the entity
  const drawnCards = entity.drawnCards || [];

  drawnCards.forEach((card) => {
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

  // Apply shaking effect to the target
  applyTargetEffect(target);

  applyDirectEffects(card, target, origin);

  // Pause for 1.5 seconds
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Await both updateEntityStatus calls to finish
  await Promise.all([
    updateEntityStatus(origin),
    updateEntityStatus(target)
  ]);

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
    actionDiv.style.color = 'black';
    actionDiv.textContent = action;
    actionsContainer.appendChild(actionDiv);
  });
  actionsContainer.scrollTop = actionsContainer.scrollHeight;
}

// document.getElementById("nextRound").addEventListener("click", () => {
//   startNextRound();
//   updateUI();
// });
