// gameLoop.mjs
import {
  heroes,
  monsters,
  playMonstersTurn,
  resetShield,
  resetStrengthen,
  processEndOfTurnEffects,
  applyProficiencyEffects
} from "./playTurns.mjs";
import { updateUI } from "../../../ui/gameUI.mjs";
import { increasePower, unlockHero, unlockProficiency } from "../state/stateManager.mjs";


let roundCounter = 0;
let winner = "";

export let actions = [];

heroes.forEach(
  (hero) => ((hero.initialHealth = hero.health), (hero.alive = true))
);
monsters.forEach(
  (monster) => (
    (monster.initialHealth = monster.health), (monster.alive = true)
  )
);

export function startGame() {
  // Initialize or reset the game state
  heroes.forEach((hero) => {
    hero.turnTaken = false;
    hero.drawnCards = [];
    console.log(hero)
    if (hero.aggroLife) {
      hero.aggro = 20
    }
  });
  monsters.forEach((monster) => {
    monster.turnTaken = false;
    monster.drawnCards = [];
  });
  roundCounter = 0;
  winner = "";
  console.log("Game Start");
  heroes.forEach(hero => {
    applyProficiencyEffects(hero, heroes)
  })
}

export function getGameState() {
  // Return the current state of the game
  return {
    roundCounter,
    winner,
    heroes,
    monsters,
    actions,
  };
}

let isMonstersTurnProcessing = false;

export async function executeMonstersTurn() {
  if (!isMonstersTurnProcessing && monsters.some(monster => monster.alive)) {
    isMonstersTurnProcessing = true;
    console.log(`Round ${roundCounter + 1} Start: Monsters' Turn`);

    await playMonstersTurn(monsters, heroes);

    processEndOfTurnEffects(monsters);
    processEndOfTurnEffects(heroes);
    for (const monster of monsters) {
      updateEntityStatus(monster);
    }
    for (const hero of heroes) {
      updateEntityStatus(hero);
    }
    // Optionally ensure these also respect the sequential flow if they involve asynchronous operations
    // await removeDefeatedEntities(heroes);
    // await removeDefeatedEntities(monsters);

    checkGameOver();
    roundCounter++;

    console.log(`Round ${roundCounter} End`);
    isMonstersTurnProcessing = false;
    updateUI();
  }
}



function checkGameOver() {
  if (!heroes.some((h) => h.alive)) {
    winner = "Monsters";
    console.log("Monsters win the game!");
    window.location.href = "../../../../index.html";
  } else if (!monsters.some((m) => m.alive)) {
    winner = "Heroes";
    console.log("Heroes win the game!");
    window.location.href = "../../../../dungeonCrawl/dungeonCrawl.html";
  }

  if (winner) {
    console.log(`${winner} wins!`);
    unlockProficiency();
    unlockHero();
    increasePower();
  }
}

export async function checkAndProgressRound() {
  console.log(heroes)
  if (!isMonstersTurnProcessing) {
    const allHeroesDone = heroes.every(hero => hero.turnTaken);
    checkGameOver();
    if (allHeroesDone) {
      await executeMonstersTurn();  // Await for the completion of the monsters' turn
      resetShield(monsters);
      resetStrengthen(heroes);
      // actions = [];
      startNextRound(); // Maybe this needs to be safeguarded or adjusted as well
      updateUI();
    }
  }
}



function resetTurns(entities) {
  entities.forEach(entity => {
      entity.turnTaken = false;
  });
}

export function startNextRound(){
  resetTurns([...heroes, ...monsters]);
  heroes.forEach(hero => {
    applyProficiencyEffects(hero, heroes)
  })
}

export function updateEntityStatus(entity) {
  return new Promise((resolve, reject) => {
    if (
      ((entity.aggroLife && entity.aggro <= 0) ||
      (!entity.aggroLife && entity.health <= 0)) &&
      entity.alive
    ) {
      entity.alive = false;
      console.log(`${entity.role} has been defeated.`);
    }
    resolve(); // Resolve the promise after the update is done
  });
}


// Initialization of the game
startGame();
