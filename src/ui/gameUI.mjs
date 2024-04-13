import {
  getGameState,
  startNextRound,
} from "../engine/logic/gameplay/gameLoop.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateUI(); // Initial UI update, consider adding startGame() if needed
});

function updateUI() {
  const {
    roundCounter,
    winner,
    heroes,
    monsters,
    actions = [],
  } = getGameState(); // Ensure actions is an array

  updateGameInfo(roundCounter, winner);
  displayEntities([...heroes, ...monsters]);
  displayActions(actions);
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

    entities.forEach((entity) => {
        const entityDiv = document.createElement("div");
        entityDiv.classList.add("entity");

        // Entity's basic info
        const entityInfoHTML = `
            <strong>${entity.proficiency.name || ""} ${entity.role}</strong><br>
            Health: ${entity.health}, Shield: ${entity.shield}, Strength: ${entity.strengthen}, Aggro: ${entity.aggro}<br>
        `;
        entityDiv.innerHTML = entityInfoHTML;

        // Additional visual components
        const deckVisualDiv = createDeckVisual(entity);
        const drawnCardsDiv = createDrawnCardsVisual(entity);
        const effectsDiv = createEffectsVisual(entity);

        entityDiv.appendChild(deckVisualDiv);
        entityDiv.appendChild(drawnCardsDiv);
        entityDiv.appendChild(effectsDiv);

        // Append to the appropriate container
        if (entity.faction === "hero") {
            heroesContainer.appendChild(entityDiv);
        } else {
            monstersContainer.appendChild(entityDiv);
        }
    });
}

function createDeckVisual(entity) {
    const deckVisualDiv = document.createElement("div");
    deckVisualDiv.classList.add("deck-visual");
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
            if(effect.value > 0){
                effectTokenDiv.classList.add("effect-token", effect.type, "positive");
            } else if(effect.value < 0){
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
