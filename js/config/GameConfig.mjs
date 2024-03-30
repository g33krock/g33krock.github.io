import { PlayerManager } from "../managers/PlayerManager.mjs";
import { Gameplay } from "../game/Gameplay.mjs";
import { CardManager } from "../game/CardManager.mjs";
import { MonsterManager } from "../managers/MonsterManager.mjs";
import { monstersArray } from "../models/Monster.mjs";
import { UIManager } from "../game/UIManager.mjs";

export let playerRoles = JSON.parse(localStorage.getItem('playerConfigurations') || '[]');
export const playerManager = new PlayerManager(playerRoles.length);
export const gameplay = new Gameplay(playerRoles.length, playerManager);
export const cardManager = new CardManager();
export const playerHands = document.querySelectorAll(".player-hand");
export const monsterManager = new MonsterManager(monstersArray);
export const uiManager = new UIManager();

monsterManager.populateMonsters(); 


export function removeIllusion() {
    playerRoles = playerRoles.filter((role) => role !== "Illusion");
    const playerHand = document.getElementById("player-illusion-hand");
  
    if (playerHand && playerHand.parentElement) {
      playerHand.parentElement.remove();
    }
  }
