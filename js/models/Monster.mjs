// Monster.mjs
import { EntityManager } from "../managers/EntityManager.mjs";
import { Entity } from "./Entity.mjs";
import { monsterManager, playerManager } from "../config/GameConfig.mjs";
import { displayAmountOverTarget } from "../game/Gameplay.mjs";

const entity = new Entity();

export class Monster extends EntityManager {
  constructor(options = {}) {
    super(options);
    this.monsterType = options.monsterType || "Generic Monster";
    this.abilities = options.abilities || [];
    this.power = options.power;
  }

  executeRandomAbility(players, monster) {
    const abilityIndex = Math.floor(Math.random() * this.abilities.length);
    const selectedAbility = this.abilities[abilityIndex];
    const monsterContainer = document.querySelector(
      `.monster[data-monster-index="${monster.index}"]`
    );

    console.log(selectedAbility);

    if (monster.effects.some((effect) => effect.type === "interrupt")) {
      return;
    } else if (selectedAbility.target === 0 && monster.alive) {
      this.applyAbilityEffects(monster, selectedAbility, monsterContainer);
      return;
    }
    let highestAggro = 0,
      targetPlayerIndex = -1;
    players.forEach((player, index) => {
      let aggroVariation = parseFloat((Math.random() * 20).toFixed(2));
      let totalAggro =
        player.aggro +
        (player.monsterSpecificAggro[this.index] || 0) +
        aggroVariation;
      console.log(`Player: ${player.role}`);
      console.log(`Base Aggro: ${player.aggro}`);
      console.log(
        `Monster Specific Aggro: ${player.monsterSpecificAggro[this.index]}`
      );
      console.log(`Aggro Variation: ${aggroVariation}`);
      console.log(`Total Aggro: ${totalAggro}`);
      if (player.alive && totalAggro > highestAggro) {
        highestAggro = totalAggro;
        targetPlayerIndex = index;
      }
    });

    console.log(selectedAbility);

    if (targetPlayerIndex !== -1) {
      const targetPlayer = players[targetPlayerIndex];
      if (targetPlayer.alive) {
        const playerContainer = document.querySelector(
          `.player-container[data-playerindex="${targetPlayer.index}"]`
        );

        console.log(targetPlayer);

        if (targetPlayer.flameShield) {
          console.log("Hit Flame Shield");
          this.applyAbilityEffects(
            this,
            { health: -3, hot: -2, counter: 1 },
            monsterContainer
          );
        } else if (targetPlayer.frostShield) {
          console.log("Hit Frost Shield");
          this.applyAbilityEffects(
            this,
            { strength: -3, stot: -3, counter: 1 },
            monsterContainer
          );
        } else if (targetPlayer.arcaneShield) {
          console.log("Hit Arcane Shield");
          this.applyAbilityEffects(
            this,
            { shield: -2, stot: -2, counter: 1 },
            monsterContainer
          );
        }

        if (
          targetPlayer.effects.some(
            (effect) => effect.type === "explosive poison trap"
          )
        ) {
          console.log("Hit Explosive Poison Trap");
          this.applyAbilityEffects(
            this,
            { health: -5, hot: -2, counter: 2 },
            monsterContainer
          );
        }
        if (
          targetPlayer.effects.some(
            (effect) => effect.type === "paralyzing trap"
          )
        ) {
          console.log("Hit Paralyzing Trap");
          this.applyAbilityEffects(
            this,
            { interrupt: 1, counter: 1 },
            monsterContainer
          );
        } else {
          console.log("Player Punching Time!");
          if (playerContainer) {
            playerContainer.classList.add("shake-animation");

            setTimeout(() => {
              if (playerContainer) {
                playerContainer.classList.remove("shake-animation");
              }
            }, 500);
          }
          this.displayAbilityIcon(targetPlayer.index, selectedAbility.name);

          this.applyAbilityEffects(
            targetPlayer,
            selectedAbility,
            playerContainer
          );
        }
      }
    }
  }

  displayAbilityIcon(targetPlayerIndex, abilityName) {
    const playerContainer = document.querySelector(
      `.player-container[data-playerindex="${targetPlayerIndex}"]`
    );
    if (!playerContainer) return;

    const abilityIcon = document.createElement("img");
    abilityIcon.src = `../../images/${abilityName}.png`;
    abilityIcon.style.position = "absolute";
    abilityIcon.style.width = "50px";
    abilityIcon.style.transition = "all 2s";
    abilityIcon.style.zIndex = "1000";
    playerContainer.appendChild(abilityIcon);

    setTimeout(() => {
      abilityIcon.style.width = "100px";
    }, 10);

    setTimeout(() => {
      playerContainer.removeChild(abilityIcon);
    }, 2000);
  }

  applyAbilityEffects(target, ability, playerContainer) {
    if (ability.health !== 0 && ability.health !== undefined) {
      if (
        target.faction !== "monster" &&
        target.effects.some((effect) => effect.type === "reflect")
      ) {
        console.log(`reflected!`);
        this.modifyHealth(ability.health, this);
      }
      console.log(`Amount: ${ability.health}`);
      console.log(`Monster: ${JSON.stringify(this, null, 2)}`);
      console.log(`Target: ${JSON.stringify(target, null, 2)}`);
      target.modifyHealth(ability.health, target);
      displayAmountOverTarget(playerContainer, ability.health, "health");
    }
    if (ability.shield !== 0 && ability.shield !== undefined) {
      target.modifyShield(ability.shield);
      displayAmountOverTarget(playerContainer, ability.shield, "shield");
    }
    if (ability.strengthen !== 0 && ability.strengthen !== undefined) {
      target.modifyStrengthen(ability.strengthen);
      displayAmountOverTarget(
        playerContainer,
        ability.strengthen,
        "strengthen"
      );
    }

    if (ability.hot !== 0 && ability.hot !== undefined)
      target.addEffect({
        type: "hot",
        value: ability.hot,
        counters: ability.counter,
      });
    if (ability.stot !== 0 && ability.stot !== undefined)
      target.addEffect({
        type: "stot",
        value: ability.stot,
        counters: ability.counter,
      });
    if (ability.shot !== 0 && ability.shot !== undefined)
      target.addEffect({
        type: "shot",
        value: ability.shot,
        counters: ability.counter,
      });

    playerManager.updatePlayerInfoBoxes();
    monsterManager.updateMonsterInfoBoxes();
  }

  selectTargetBasedOnAbility(ability, players) {
    let targetPlayerIndex = -1;
    if (ability.target === "highestAggro") {
      let highestAggro = 0;
      players.forEach((player, index) => {
        if (player.aggro > highestAggro) {
          highestAggro = player.aggro;
          targetPlayerIndex = index;
        }
      });
    }
    return targetPlayerIndex;
  }

  selectPlayerBasedOnAggro(players) {
    let highestAggro = 0;
    let targetPlayer = null;

    players.forEach((player) => {
      if (player.aggro > highestAggro) {
        highestAggro = player.aggro;
        targetPlayer = player;
      }
    });

    return targetPlayer;
  }
}

export const monstersArray = [
  {
    monsterType: "Goblin",
    health: 10,
    power: 1,
    abilities: [
      { name: "Slash", target: 1, health: -3 },
      { name: "Slash", target: 1, health: -3 },
      { name: "Evade", target: 0, shield: 2 },
      { name: "Slash", target: 1, health: -3 },
      { name: "Evade", target: 0, shield: 2 },
      { name: "Quick Attack", target: 1, shield: -2, health: -1 },
      { name: "Slash", target: 1, health: -3 },
      { name: "Evade", target: 0, shield: 2 },
      { name: "Quick Attack", target: 1, shield: -2, health: -1 },
      { name: "Regenerate", target: 0, counter: 3, hot: 2 },
    ],
  },
  {
    monsterType: "Skeleton",
    health: 10,
    power: 1,
    abilities: [
      { name: "Slash", target: 1, health: -3 },
      { name: "Slash", target: 1, health: -3 },
      { name: "Block", target: 0, shield: 2 },
      { name: "Slash", target: 1, health: -3 },
      { name: "Block", target: 0, shield: 2 },
      { name: "Rend Armor", target: 1, shield: -5 },
      { name: "Slash", target: 1, health: -3 },
      { name: "Block", target: 0, shield: 2 },
      { name: "Rend Armor", target: 1, shield: -5 },
      { name: "Regenerate", target: 0, counter: 3, hot: 2 },
    ],
  },
  {
    monsterType: "Werewolf",
    health: 20,
    power: 2,
    abilities: [
      { name: "Scratch", target: 1, health: -3, shot: -1, counter: 2 },
      { name: "Scratch", target: 1, health: -3, shot: -1, counter: 2 },
      { name: "Bite", target: 1, health: -8 },
      { name: "Scratch", target: 1, health: -3, shot: -1, counter: 2 },
      { name: "Bite", target: 1, health: -8 },
      { name: "Swipe", target: 2, health: -3, shot: -1, stot: -1, counter: 2 },
      { name: "Scratch", target: 1, health: -3, shot: -1, counter: 2 },
      { name: "Bite", target: 1, health: -8 },
      { name: "Swipe", target: 2, health: -3, shot: -1, stot: -1, counter: 2 },
      { name: "Monster Heal", target: 0, health: 10 },
    ],
  },
  {
    monsterType: "Ogre",
    health: 30,
    power: 3,
    abilities: [
      { name: "Crush", target: 1, health: -5, shot: -2, counter: 2 },
      { name: "Crush", target: 1, health: -5, shot: -2, counter: 2 },
      { name: "Throw Rock", target: 1, health: -10 },
      { name: "Crush", target: 1, health: -5, shot: -2, counter: 2 },
      { name: "Throw Rock", target: 1, health: -10 },
      { name: "Stomp", target: 2, health: -3, shot: -2, stot: -2, counter: 2 },
      { name: "Crush", target: 1, health: -5, shot: -2, counter: 2 },
      { name: "Throw Rock", target: 1, health: -10 },
      { name: "Stomp", target: 2, health: -3, shot: -2, stot: -2, counter: 2 },
      { name: "Monster Heal", target: 0, health: 15 },
    ],
  },
  {
    monsterType: "MindFlayer",
    health: 40,
    power: 4,
    abilities: [
      { name: "Mind Blast", target: 1, health: -5, counter: 1, hot: -3 },
      { name: "Mind Blast", target: 1, health: -5, counter: 1, hot: -3 },
      {
        name: "Psychic Scream",
        target: 2,
        health: -5,
        shot: -1,
        stot: -1,
        counter: 2,
      },
      { name: "Mind Blast", target: 1, health: -5, counter: 1, hot: -3 },
      {
        name: "Psychic Scream",
        target: 2,
        health: -5,
        shot: -1,
        stot: -1,
        counter: 2,
      },
      { name: "Debilitate", target: 2, shot: -1, stot: -2, counter: 3 },
      { name: "Mind Blast", target: 1, health: -5, counter: 1, hot: -3 },
      {
        name: "Psychic Scream",
        target: 2,
        health: -5,
        shot: -1,
        stot: -1,
        counter: 2,
      },
      { name: "Debilitate", target: 2, shot: -1, stot: -2, counter: 3 },
      { name: "Regeneration", target: 0, counter: 3, hot: 5 },
    ],
  },
  {
    monsterType: "Dragon",
    health: 50,
    power: 5,
    abilities: [
      { name: "Fire Breath", target: 1, health: -10, counter: 1, hot: -5 },
      { name: "Fire Breath", target: 1, health: -10, counter: 1, hot: -5 },
      {
        name: "Tail Swipe",
        target: 2,
        health: -8,
        shot: -2,
        stot: -2,
        counter: 2,
      },
      { name: "Fire Breath", target: 1, health: -10, counter: 1, hot: -5 },
      {
        name: "Tail Swipe",
        target: 2,
        health: -8,
        shot: -2,
        stot: -2,
        counter: 2,
      },
      { name: "Wing Gust", target: 2, shot: -3, stot: -3, counter: 3 },
      { name: "Fire Breath", target: 1, health: -10, counter: 1, hot: -5 },
      {
        name: "Tail Swipe",
        target: 2,
        health: -8,
        shot: -2,
        stot: -2,
        counter: 2,
      },
      { name: "Wing Gust", target: 2, shot: -3, stot: -3, counter: 3 },
      { name: "Fiery Regeneration", target: 0, counter: 3, hot: 10 },
    ],
  },
];
