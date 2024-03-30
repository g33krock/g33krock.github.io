import { playerDecks, playerDiscards, isDeckEmpty, availableCards } from "../models/Card.mjs";
import { UIManager } from "./UIManager.mjs";
import { selectTargetPlayer, applyCardEffect } from "./Gameplay.mjs";
import { playerManager, playerRoles } from "../config/GameConfig.mjs";
import { buildDeck } from "../models/Card.mjs";
import { playerHands } from "./GameInitialization.mjs";

const uiManager = new UIManager();

export class CardManager {
  constructor() {}

  discardCard(
    playerIndex,
    cardIndex,
    playerDecks,
    playerDiscards,
    discardPile,
    buildDeck,
    availableCards,
    playerRoles,
    renderPlayerHand
  ) {
    if (
      playerIndex >= 0 &&
      playerIndex < playerDecks.length &&
      cardIndex >= 0 &&
      cardIndex < playerDecks[playerIndex].deck.length
    ) {
      const topCard = playerDecks[playerIndex].deck.splice(cardIndex, 1)[0];
      playerDiscards[playerIndex].push(topCard);
      uiManager.renderCard(topCard);

      const discardedCardElement = playerHands[playerIndex].children[cardIndex];
      if (discardedCardElement) {
        playerHands[playerIndex].removeChild(discardedCardElement);

        const discardedCardClone = discardedCardElement.cloneNode(true);
        discardedCardClone.classList.add("discard-card");
        discardPile.appendChild(discardedCardClone);

        setTimeout(() => {
          discardedCardClone.style.transform = "translateY(-100px)";
          discardedCardClone.style.opacity = 0;
        }, 100);

        setTimeout(() => {
          discardPile.removeChild(discardedCardClone);
        }, 1000);

        if (isDeckEmpty(playerDecks[playerIndex])) {
          buildDeck(availableCards, playerDecks[playerIndex]);
          const playerHandElement = playerHands[playerIndex];
          const playerRole = playerRoles[playerIndex].role;
          console.log(playerRoles)
          renderPlayerHand(
            playerDecks[playerIndex],
            playerHandElement,
            playerRole
          );
        }
      }
    } else {
      console.error("Discard attempt failed: Index out of bounds");
    }
  }

  renderPlayerHand(playerDeck, playerHandElement, playerRole) {
    playerHandElement.innerHTML = "";

    playerDeck.deck.forEach((_) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");

      cardElement.textContent = playerRole;

      console.log(playerRole)

      cardElement.style.display = "flex";
      cardElement.style.alignItems = "center";
      cardElement.style.justifyContent = "center";
      cardElement.style.height = "100px";
      cardElement.style.width = "70px";
      cardElement.style.border = "1px solid #000";
      cardElement.style.backgroundColor = "#FFF";
      cardElement.style.color = "#000";
      cardElement.style.margin = "5px";
      cardElement.style.padding = "10px";
      cardElement.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
      cardElement.style.backgroundImage = `url('./images/${playerRole.toLowerCase()}.png')`;
      cardElement.style.backgroundSize = "cover";
      cardElement.style.backgroundPosition = "center";
      cardElement.style.backgroundRepeat = "no-repeat";

      playerHandElement.appendChild(cardElement);
    });
  }

  async drawTwoCards(playerIndex) {
    if (playerDecks[playerIndex].deck.length <= 3) {
      buildDeck(availableCards, playerDecks[playerIndex]);
    }

    const drawnCards = playerDecks[playerIndex].deck.splice(0, 2);

    await displayCardsForSelection(drawnCards, async (selectedCardIndex) => {
      const selectedCard = drawnCards[selectedCardIndex];
      if (selectedCard.target === 1) {
        const { targetIndex, targetType } = await selectTargetPlayer(
          playerIndex
        );
        applyCardEffect(selectedCard, targetIndex, playerIndex, targetType);
      } else {
        applyCardEffect(selectedCard, playerIndex, playerIndex, "player"); 
      }

      playerDiscards[playerIndex].push(...drawnCards);
      uiManager.updateDiscardPileUI(drawnCards);
      playerManager.updatePlayerInfoBoxes();
    });

    if (isDeckEmpty(playerDecks[playerIndex])) {
      buildDeck(availableCards, playerDecks[playerIndex]);
      this.renderPlayerHand(
        playerDecks[playerIndex],
        playerHands[playerIndex],
        playerRoles[playerIndex]
      );
    }
  }
}

export function displayCardsForSelection(cards, callback) {
  return new Promise((resolve) => {

    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    const selectionContainer = document.createElement("div");
    selectionContainer.style.display = "flex";
    selectionContainer.style.padding = "20px";
    selectionContainer.style.border = "1px solid #fff";
    selectionContainer.style.backgroundColor = "#fff";
    selectionContainer.style.borderRadius = "10px";
    selectionContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    selectionContainer.style.position = "fixed";
    selectionContainer.style.left = "50%";
    selectionContainer.style.top = "50%";
    selectionContainer.style.transform = "translate(-50%, -50%)";
    selectionContainer.style.justifyContent = "space-around";

    cards.forEach((card, index) => {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.style.backgroundColor = "black";
      cardElement.style.color = "white";
      cardElement.style.cursor = "pointer";
      if (index === 0) {
        cardElement.style.transform = "rotate(-10deg)";
        cardElement.style.marginRight = "25px";
      } else {
        cardElement.style.marginLeft = "25px";
      }

      const imageElement = document.createElement("img");
      imageElement.src = `../../images/${card.name}.png`; 
      imageElement.alt = card.name;
      imageElement.style.width = "100px"; 
      imageElement.style.height = "auto"; 
      imageElement.style.display = "block";
      cardElement.appendChild(imageElement);

      const nameElement = document.createElement("h3");
      nameElement.textContent = card.name;
      cardElement.appendChild(nameElement);

      for (const property in card) {
        if (
          card[property] !== 0 &&
          property !== "name" &&
          property !== "player"
        ) {
          const propertyElement = document.createElement("p");
          const targetValue =
            property === "target"
              ? card[property] === 0
                ? "self"
                : "other"
              : card[property];
          propertyElement.textContent =
            property === "target"
              ? `target: ${targetValue}`
              : `${property}: ${card[property]}`;
          cardElement.appendChild(propertyElement);
        }
      }

      cardElement.onclick = () => {
        document.body.removeChild(overlay);
        callback(index);
        resolve();
      };

      selectionContainer.appendChild(cardElement);
    });

    overlay.appendChild(selectionContainer);
    document.body.appendChild(overlay);
  });
}
