// GameInitialization.mjs
import {
  playerRoles,
  playerManager,
  gameplay,
  cardManager,
} from "../config/GameConfig.mjs";
import {
  playerDecks,
  playerDiscards,
  buildDeck,
  availableCards,
} from "../models/Card.mjs";
import { monsterManager } from "../config/GameConfig.mjs";

export let playerHands;

export function initializeGame() {
  const discardPile = document.getElementById("discard-pile");
  const selectedRoles = JSON.parse(
    localStorage.getItem("playerConfigurations")
  );
  const playerHandsContainer = document.querySelector(".player-hands");
  let shieldAllValue = 0;
  let strengthenAllValue = 0;

  playerManager.players.forEach((player) => {
    if (player.proficiency) {
      shieldAllValue += player.proficiency.shieldAll || 0;
      strengthenAllValue += player.proficiency.strengthenAll || 0;
    }
    player.applyRoundStartProficiencyEffects();
  });

  playerManager.players.forEach((player) => {
    player.shield += shieldAllValue;
    player.strengthen += strengthenAllValue;
  });

  playerHandsContainer.innerHTML = "";

  playerManager.players.forEach((player, index) => {
    player.index = index;
    selectedRoles.index = index;

    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player-container");
    playerContainer.setAttribute("data-playerindex", index);

    const playerHand = document.createElement("div");
    playerHand.classList.add("player-hand");
    playerHand.id = `player${index + 1}-hand`;
    playerHand.setAttribute("data-playerindex", index);

    const playerInfo = document.createElement("div");
    playerInfo.classList.add("player-info");
    playerInfo.id = `player${index + 1}-info`;

    const playerProficiency = document.createElement("div");
    playerProficiency.classList.add("player-proficiency");
    playerProficiency.id = `player${index + 1}-proficiency`;
    playerProficiency.textContent = selectedRoles[index].proficiency;

    playerContainer.appendChild(playerHand);
    playerContainer.appendChild(playerInfo);
    playerContainer.appendChild(playerProficiency);

    playerHandsContainer.appendChild(playerContainer);
  });

  playerHands = document.querySelectorAll(".player-hand");
  monsterManager.renderMonsters();

  playerDecks.forEach((playerDeck, index) => {
    const playerHandElement = playerHands[index];
    const playerRole = playerRoles[index].role;
    cardManager.renderPlayerHand(playerDeck, playerHandElement, playerRole);
  });

  playerManager.updatePlayerInfoBoxes();

  playerHands.forEach((playerHand) => {
    playerHand.addEventListener("click", () => {
      const playerIndex = parseInt(playerHand.dataset.playerindex, 10);
      if (playerDecks[playerIndex].deck.length >= 2) {
        if (gameplay.canPlayerTakeTurn(playerIndex)) {
          if (gameplay.doesPlayerHaveExtraTurn(playerIndex)) {
            cardManager.drawTwoCards(playerIndex);
          }
          cardManager.drawTwoCards(playerIndex);
        } else {
          console.warn(
            `Player ${playerIndex + 1} has already taken their turn this round.`
          );
        }
      } else {
        console.error("Not enough cards to draw two");
        buildDeck(availableCards, playerDecks[playerIndex]);
      }
    });
  });

  playerHands.forEach((playerHand) => {
    playerHand.addEventListener("click", (event) => {
      if (
        event.target.classList.contains("card") ||
        event.target.closest(".card")
      ) {
        const cardElement = event.target.closest(".card");
        const playerHandsArray = Array.from(playerHands);

        const playerIndex = parseInt(
          cardElement.parentNode.dataset.playerindex,
          10
        );
        const cardIndex = Array.from(cardElement.parentNode.children).indexOf(
          cardElement
        );

        cardManager.discardCard(
          playerIndex,
          cardIndex,
          playerDecks,
          playerDiscards,
          discardPile,
          buildDeck,
          availableCards,
          playerRoles,
          cardManager.renderPlayerHand
        );
      }
    });
  });
  gameplay.initializePlayerSelection();
}
