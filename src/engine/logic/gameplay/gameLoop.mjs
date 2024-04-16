// gameLoop.mjs
import {
  heroes,
  monsters,
  playMonstersTurn,
  resetShield,
  resetStrengthen,
  processEndOfTurnEffects,
  removeDefeatedHeroes,
  removeDefeatedMonsters
} from "./playTurns.mjs";
import { updateUI } from "../../../ui/gameUI.mjs";

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
  });
  monsters.forEach((monster) => {
    monster.turnTaken = false;
    monster.drawnCards = [];
  });
  roundCounter = 0;
  winner = "";
  console.log("Game Start");
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
  } else if (!monsters.some((m) => m.alive)) {
    winner = "Heroes";
    console.log("Heroes win the game!");
  }

  // Additional handling if the game has ended
  if (winner) {
    console.log(`${winner} wins!`);
    // Code to handle end of the game, e.g., restarting or updating the UI
  }
}

export function checkAndProgressRound() {
  if (!isMonstersTurnProcessing) {
    const allHeroesDone = heroes.every(hero => hero.turnTaken);
    if (allHeroesDone) {
      executeMonstersTurn();  // This will now check if it's safe to process
      resetShield(monsters);
    resetStrengthen(heroes);
      actions = []
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
  // executeMonstersTurn();
  resetTurns([...heroes, ...monsters]);
}

function updateEntityStatus(entity) {
  if (
    ((entity.aggroLife && entity.aggro <= 0) ||
      (!entity.aggroLife && entity.health <= 0)) &&
    entity.alive
  ) {
    entity.alive = false;
    console.log(`${entity.role} has been defeated.`);
  }
}

// Initialization of the game
startGame();
