//gameplay.mjs
import {
  playerManager,
  gameplay,
  playerRoles,
  removeIllusion,
  playerHands,
  monsterManager,
} from "../config/GameConfig.mjs";
import { playerDecks, playerDiscards, isDeckEmpty } from "../models/Card.mjs";
import { UIManager } from "./UIManager.mjs";
import { buildDeck } from "../models/Card.mjs";

let tempSelectedTargetIndex = null;
let selectTargetPlayerResolver = null;
const uiManager = new UIManager();

export class Gameplay {
  constructor(playerCount, playerManager) {
    this.playerCount = playerCount;
    this.currentRound = 0;
    this.turnsTaken = 0;
    this.playerTurns = new Array(playerCount).fill(false);
    this.playerManager = playerManager;
    this.extraTurn = new Array(playerCount).fill(false);
  }

  startNewRound() {
    removeIllusion();
    this.currentRound++;
    this.turnsTaken = 0;
    this.playerTurns.fill(false);
    this.extraTurn.fill(false);
    this.applyGlobalProficiencyEffects();
    playerManager.players.forEach((player, index) => {
      if (player.health > player.startingHealth) {
        player.health = player.startingHealth;
      }
      this.updatePlayerContainerPosition(index);
      player.applyRoundStartProficiencyEffects();
      if (!player.alive) {
        this.playerTookTurn(index);
      }
    });
  }

  initializePlayerSelection() {
    const playerContainers = document.querySelectorAll(".player-container");
    playerContainers.forEach((container, index) => {
      container.addEventListener("click", function () {
        handlePlayerSelection(index);
      });
    });
  }

  playerTookTurn(playerIndex) {
    if (this.playerTurns[playerIndex] && !this.extraTurn[playerIndex]) {
      return;
    }

    if (this.extraTurn[playerIndex]) {
      this.extraTurn[playerIndex] = false;
    } else {
      this.playerTurns[playerIndex] = true;
      this.turnsTaken++;
      this.updatePlayerContainerPosition(playerIndex);
    }

    if (this.turnsTaken >= this.playerCount && !this.extraTurn.includes(true)) {
      setTimeout(() => {
        this.playerTurnOver();
      }, 2000);
    }
  }

  shutOffExtraTurns() {
    this.extraTurn.forEach((turn) => (turn = false));
  }

  doesPlayerHaveExtraTurn(playerIndex) {
    return this.extraTurn[playerIndex];
  }

  grantExtraTurn(playerIndex) {
    if (!this.extraTurn[playerIndex]) {
      this.extraTurn[playerIndex] = true;
    }
  }

  canPlayerTakeTurn(playerIndex) {
    return !this.playerTurns[playerIndex];
  }

  async playerTurnOver() {
    await monsterManager.executeRandomAbilities(playerManager.players);
    monsterManager.resetShield();
    this.playerManager.resetStrength();
    await monsterManager.updateAllEffects();
    this.endRound();
  }

  async endRound() {
    this.playerManager.resetShield();
    monsterManager.resetStrength();
    await this.playerManager.updateAllPlayers();
    this.playerManager.updatePlayerInfoBoxes();
    monsterManager.updateMonsterInfoBoxes();
    this.removeMonsterContainer();
    this.startNewRound();
  }

  removeMonsterContainer() {
    monsterManager.monsters.forEach((monster) => {
      if (!monster.alive) {
        monster.effects = [];
        const monsterContainer = document.querySelector(
          `.monster[data-monster-index="${monster.index}"]`
        );
        monsterContainer?.remove();
        this.checkMonstersAlive();
      }
    });
  }

  checkPlayersAlive() {
    const allPlayersDead = playerManager.players.every(
      (player) => !player.alive
    );
    if (allPlayersDead) {
      alert("You Lose!");
      window.location.href = "../../index.html";
    }
  }

  checkMonstersAlive() {
    const allMonstersDead = monsterManager.monsters.every(
      (monster) => !monster.alive
    );
    if (allMonstersDead) {
      alert("You Win!");
      window.location.href = "../../index.html";
    }
  }

  updatePlayerContainerPosition(playerIndex) {
    const playerContainer = document.querySelector(
      `.player-container[data-playerindex="${playerIndex}"]`
    );

    if (playerContainer) {
      if (this.canPlayerTakeTurn(playerIndex)) {
        playerContainer.classList.remove("raised-player-container");
      } else {
        playerContainer.classList.add("raised-player-container");
      }
      if (this.playerManager.players[playerIndex].health <= 0 || this.playerManager.players[playerIndex].isAlive === false) {
        playerContainer.remove();
        this.checkPlayersAlive();
      }
    }
  }

  applyGlobalProficiencyEffects() {
    let shieldAllValue = 0;
    let strengthenAllValue = 0;

    this.playerManager.players.forEach((player) => {
      if (player.proficiency) {
        shieldAllValue += player.proficiency.shieldAll || 0;
        strengthenAllValue += player.proficiency.strengthenAll || 0;
      }
    });

    this.playerManager.players.forEach((player) => {
      player.shield += shieldAllValue;
      player.strengthen += strengthenAllValue;
    });
  }
}

function handlePlayerSelection(index) {
  if (
    (playerManager[index] && playerManager[index].alive) ||
    (monsterManager[index] && monsterManager[index].alive)
  ) {
    tempSelectedTargetIndex = index;
    if (selectTargetPlayerResolver) {
      selectTargetPlayerResolver(index);
      selectTargetPlayerResolver = null;
    }
  }
}

export async function selectTargetPlayer(currentPlayerIndex) {
  return new Promise((resolve) => {
    const playerContainers = document.querySelectorAll(
      ".player-container, .illusion-player-container, .monster"
    );
    playerContainers.forEach((container) => {
      container.addEventListener("click", function (event) {
        const targetElement = event.currentTarget;
        const isMonster =
          targetElement.getAttribute("data-monster-index") !== null;
        const targetType = isMonster ? "monster" : "player";
        const indexAttribute = isMonster
          ? "data-monster-index"
          : "data-playerindex";
        const selectedIndex = parseInt(
          targetElement.getAttribute(indexAttribute),
          10
        );

        if (!isNaN(selectedIndex)) {
          resolve({ targetIndex: selectedIndex, targetType: targetType });
        }
      });
    });
  }).then(({ targetIndex, targetType }) => {
    return { targetIndex, targetType };
  });
}

export async function handleFlurryEffect(
  originatingPlayerIndex,
  targetPlayerIndex,
  targetType
) {
  const playerDeck = playerDecks[originatingPlayerIndex].deck;
  if (playerDeck.length < 2) {
    console.warn(
      "Not enough cards to activate Flurry effect. Drawing whatever is left."
    );
  }

  const drawnCards = playerDeck.splice(0, Math.min(2, playerDeck.length));

  drawnCards.forEach((card, index) => {
    setTimeout(() => {
      console.log(`Flurry effect: playing ${card.name}`);
      if (card.name === "mastermind") {
        console.log("Mastermind does not stack with Flurry");
      } else {
        applyCardEffect(
          card,
          targetPlayerIndex,
          originatingPlayerIndex,
          targetType
        );
      }
    }, index * 1000);
  });

  await new Promise((resolve) => setTimeout(resolve, drawnCards.length * 1000));

  playerDiscards[originatingPlayerIndex].push(...drawnCards);
  uiManager.updateDiscardPileUI(drawnCards);

  if (isDeckEmpty(playerDecks[originatingPlayerIndex])) {
    buildDeck(availableCards, playerDecks[originatingPlayerIndex]);
    renderPlayerHand(
      playerDecks[originatingPlayerIndex],
      playerHands[originatingPlayerIndex],
      playerRoles[originatingPlayerIndex]
    );
  }

  playerManager.updatePlayerInfoBoxes();
}

export function applyCardEffect(
  card,
  targetIndex,
  originatingPlayerIndex,
  targetType
) {
  const originatingPlayer = playerManager.getPlayer(originatingPlayerIndex);
  let targetEntity;

  if (targetType === "monster") {
    targetEntity = monsterManager.getMonster(targetIndex);
  } else {
    targetEntity = playerManager.getPlayer(targetIndex);
  }

  const adjustedCard = adjustCardEffectsBasedOnProficiency(
    originatingPlayer,
    card
  );

  let targetContainerSelector;
  if (targetType === "monster") {
    targetContainerSelector = `.monster[data-monster-index="${targetIndex}"]`;
  } else {
    targetContainerSelector = `.player-container[data-playerindex="${targetIndex}"]`;
  }

  const targetContainer = document.querySelector(targetContainerSelector);

  if (targetContainer) {
    const imageUrl = `../../images/${card.name}.png`;

    const cardImage = document.createElement("img");
    cardImage.src = imageUrl;
    cardImage.style.position = "absolute";
    cardImage.style.width = "50px";
    cardImage.style.height = "50px";
    cardImage.style.opacity = "0.8";
    cardImage.style.zIndex = "100";
    cardImage.style.animation = "grow 2s forwards";

    targetContainer.appendChild(cardImage);

    setTimeout(() => {
      if (targetContainer.contains(cardImage)) {
        targetContainer.removeChild(cardImage);

        if (targetType === "monster") {
          monsterManager.updateMonsterInfoBoxes();
        } else {
          playerManager.updatePlayerInfoBoxes();
        }
      }
    }, 2000);
  } else {
    if (targetType === "monster") {
      monsterManager.updateMonsterInfoBoxes();
    } else {
      playerManager.updatePlayerInfoBoxes();
    }
  }

  if (adjustedCard.name === "mastermind") {
    if (targetType !== "monster") {
      gameplay.grantExtraTurn(originatingPlayerIndex);
      console.log(
        `Extra turn granted by Mastermind card played by Player ${
          originatingPlayerIndex + 1
        }`
      );
    }
  }

  if (adjustedCard.name === "flurry") {
    handleFlurryEffect(originatingPlayerIndex, targetIndex, targetType);
  }

  if (adjustedCard.name === "siphon life") {
    originatingPlayer.modifyHealth(
      -adjustedCard.health,
      originatingPlayer,
      originatingPlayer
    );
  }

  if (adjustedCard.name === "selfless sacrifice") {
    originatingPlayer.modifyHealth(-3, originatingPlayer, originatingPlayer);
  }

  if (adjustedCard.name === "illusion") {
    playerRoles.push("Illusion");

    const illusionPlayerOptions = {
      role: "Illusion",
      faction: "player",
      aggro: originatingPlayer.aggro + 3,
    };
    playerManager.addPlayer(illusionPlayerOptions);

    const playerContainer = document.createElement("div");
    playerContainer.classList.add("player-container");
    playerContainer.setAttribute(
      "data-playerindex",
      playerManager.players.length - 1
    );

    const playerHand = document.createElement("div");
    playerHand.classList.add("player-hand");
    playerHand.id = `player-illusion-hand`;
    playerHand.setAttribute(
      "data-playerindex",
      playerManager.players.length - 1
    );

    const playerInfo = document.createElement("div");
    playerInfo.classList.add("player-info");
    playerInfo.id = `player${playerManager.players.length}-info`;
    playerInfo.textContent = "Illusion";

    playerContainer.appendChild(playerHand);
    playerContainer.appendChild(playerInfo);

    document.querySelector(".player-hands").appendChild(playerContainer);
  }

  if (adjustedCard.health !== 0) {
    if (
      targetType !== "monster" &&
      targetEntity.effects.some((effect) => effect.type === "reflect")
    ) {
      console.log(`reflected!`);
      originatingPlayer.modifyHealth(
        -(adjustedCard.health - originatingPlayer.strengthen),
        originatingPlayer,
        originatingPlayer
      );
    } else {
      targetEntity.modifyHealth(
        adjustedCard.health - originatingPlayer.strengthen,
        targetEntity,
        originatingPlayer
      );
    }
    displayAmountOverTarget(targetContainer, adjustedCard.health, "health");
  }
  if (adjustedCard.shield !== 0) {
    targetEntity.modifyShield(adjustedCard.shield);
    displayAmountOverTarget(targetContainer, adjustedCard.shield, "shield");
  }
  if (adjustedCard.strengthen !== 0) {
    targetEntity.modifyStrengthen(adjustedCard.strengthen);
    displayAmountOverTarget(
      targetContainer,
      adjustedCard.strengthen,
      "strengthen"
    );
  }

  if (adjustedCard.aggro !== 0) {
    if (adjustedCard.health < 0 && targetType === "monster") {
      originatingPlayer.modifyMonsterSpecificAggro(
        targetEntity.index,
        adjustedCard.aggro
      );
    } else {
      originatingPlayer.modifyAggro(adjustedCard.aggro);
    }
  }

  console.log(adjustedCard)

  const effectsToAdd = [];
  if (adjustedCard.reflect !== 0 && adjustedCard.reflect !== undefined)
    effectsToAdd.push({
      type: "reflect",
      value: adjustedCard.reflect,
      counters: adjustedCard.counter,
    });
  if (adjustedCard.interrupt !== 0 && adjustedCard.interrupt !== undefined)
    effectsToAdd.push({
      type: "interrupt",
      value: adjustedCard.interrupt,
      counters: adjustedCard.counter,
    });
  if (adjustedCard.hot !== 0)
    effectsToAdd.push({
      type: "hot",
      value: adjustedCard.hot,
      counters: adjustedCard.counter,
    });
  if (adjustedCard.stot !== 0)
    effectsToAdd.push({
      type: "stot",
      value: adjustedCard.stot,
      counters: adjustedCard.counter,
    });
  if (adjustedCard.shot !== 0)
    effectsToAdd.push({
      type: "shot",
      value: adjustedCard.shot,
      counters: adjustedCard.counter,
    });
  if (adjustedCard.explosivePoisonTrap !== 0 && adjustedCard.explosivePoisonTrap !== undefined)
    effectsToAdd.push({
      type: "explosivePoisonTrap",
      value: card.explosivePoisonTrap,
      counters: card.counter,
    });
  if (adjustedCard.paralyzingTrap !== 0 && adjustedCard.paralyzingTrap !== undefined)
    effectsToAdd.push({
      type: "paralyzingTrap",
      value: card.paralyzingTrap,
      counters: card.counter,
    });

  Promise.all(
    effectsToAdd.map((effect) => targetEntity.addEffect(effect))
  ).then(() => {
    if (targetType === "monster") {
      monsterManager.updateMonsterInfoBoxes();
    } else {
      playerManager.updatePlayerInfoBoxes();
    }
  });

  gameplay.playerTookTurn(originatingPlayerIndex);
}

function adjustCardEffectsBasedOnProficiency(player, card) {
  let adjustedCard = { ...card };
  if (player.proficiency.shield > 0 && adjustedCard.shield > 0) {
    adjustedCard.shield += player.proficiency.shield;
  } else if (player.proficiency.shield < 0 && adjustedCard.shield < 0) {
    adjustedCard.shield += player.proficiency.shield;
  }
  if (player.proficiency.strengthen > 0 && adjustedCard.strengthen > 0) {
    adjustedCard.strengthen += player.proficiency.strengthen;
  } else if (player.proficiency.strengthen < 0 && adjustedCard.strengthen < 0) {
    adjustedCard.strengthen += player.proficiency.strengthen;
  }
  if (player.proficiency.additionalCounters) {
    adjustedCard.counter += player.proficiency.additionalCounters;
  }
  if (player.proficiency.damageModifier && adjustedCard.health < 0) {
    adjustedCard.health -= player.proficiency.damageModifier;
  }
  if (player.proficiency.healModifier && adjustedCard.health > 0) {
    adjustedCard.health += player.proficiency.healModifier;
  }

  if (player.proficiency.isShadow) {
    ["health", "shield", "strengthen"].forEach((key) => {
      if (adjustedCard.hasOwnProperty(key)) {
        adjustedCard[key] =
          adjustedCard[key] > 0 ? -adjustedCard[key] : adjustedCard[key];
      }
    });
    ["hot", "shot", "stot"].forEach((key) => {
      if (adjustedCard.hasOwnProperty(key)) {
        adjustedCard[key] =
          adjustedCard[key] > 0 ? -adjustedCard[key] : adjustedCard[key];
      }
    });
  }

  return adjustedCard;
}

export function displayAmountOverTarget(targetContainer, amount, type) {
  const amountText = document.createElement("div");
  amountText.textContent = amount > 0 ? `+${amount}` : `${amount}`;
  amountText.style.position = "absolute";
  amountText.style.zIndex = "200";
  amountText.style.fontWeight = "bold";
  amountText.style.fontSize = "50px";
  amountText.style.transition = "bottom 2s ease-out";

  const colors = {
    health: amount > 0 ? "green" : "red",
    shield: amount > 0 ? "purple" : "orange",
    strengthen: amount > 0 ? "blue" : "yellow",
  };
  amountText.style.color = colors[type];

  targetContainer.style.position = "relative";
  amountText.style.bottom = "75%";
  amountText.style.left = "75%";
  amountText.style.transform = "translateX(-50%)";

  targetContainer.appendChild(amountText);

  setTimeout(() => {
    amountText.style.bottom = "100px";
  }, 0);

  setTimeout(() => {
    targetContainer.removeChild(amountText);
  }, 2000);
}
