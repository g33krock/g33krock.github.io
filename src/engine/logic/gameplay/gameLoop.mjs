import { heroes, monsters, playFactionTurn, resetShield, resetStrengthen, processEndOfTurnEffects, updateEntityStatus, removeDefeatedEntities } from "./playTurns.mjs";

let roundCounter = 0;
let winner = "";

export let actions = [];

heroes.forEach((hero) => (hero.initialHealth = hero.health));
monsters.forEach((monster) => (monster.initialHealth = monster.health));

export function startGame() {
  // Initialization code
  heroes.forEach((hero) => {
    hero.drawnCards = [];
  });
  monsters.forEach((monster) => {
    monster.drawnCards = [];
  });
}

export function getGameState() {
  // Return current state of the game
  return {
    roundCounter,
    winner,
    heroes,
    monsters,
    actions,
  };
}

// Function to execute a single round
function executeRound() {
  console.log(`Round ${roundCounter + 1} Start`);

  actions = [];

  playFactionTurn(heroes, monsters);
  resetShield(monsters);
  resetStrengthen(heroes);
  playFactionTurn(monsters, heroes);
  resetShield(heroes);
  resetStrengthen(monsters);

  processEndOfTurnEffects(heroes);
  processEndOfTurnEffects(monsters);

  heroes.map(hero => updateEntityStatus(hero));
  monsters.map(monster => updateEntityStatus(monster));

  removeDefeatedEntities(heroes);
  removeDefeatedEntities(monsters)

  roundCounter++;
  console.log(`Round ${roundCounter} End`);
}

// Function to start or continue the game
export function startNextRound() {
  heroes.forEach((hero) => {
    hero.drawnCards = [];
  });
  monsters.forEach((monster) => {
    monster.drawnCards = [];
  });

  if (heroes.some((h) => h.alive) && monsters.some((m) => m.alive)) {
    executeRound();

    // Check for a winner after the round
    if (!heroes.some((h) => h.alive)) {
      winner = "monsters";
    } else if (!monsters.some((m) => m.alive)) {
      winner = "heroes";
    }

    // Update the UI here or after function call
  }

  if (winner) {
    console.log(`${winner} wins!`);
    // Further UI update to show the winner
  }
}

// function gameplayLoop() {
//   while (heroes.some((h) => h.alive) && monsters.some((m) => m.alive)) {
//     console.log(`Round ${roundCounter + 1} Start`);

//     playFactionTurn(heroes, monsters);
//     resetShield(monsters);
//     resetStrengthen(heroes);
//     playFactionTurn(monsters, heroes);
//     resetShield(heroes);
//     resetStrengthen(monsters);

//     processEndOfTurnEffects(heroes);
//     processEndOfTurnEffects(monsters);

//     roundCounter++;
//     console.log(`Round ${roundCounter} End`);
//   }
//   if (heroes.some((h) => h.alive)) {
//     winner = "heroes";
//     heroes.map((hero) =>
//       console.log(`Role: ${hero.role}, Health: ${hero.health}`)
//     );
//   } else if (monsters.some((m) => m.alive)) {
//     winner = "monsters";
//     monsters.map((monster) =>
//       console.log(`Role: ${monster.role}, Health: ${monster.health}`)
//     );
//   } else {
//     winner = "none";
//   }
//   console.log(`${winner} wins!`);

//   console.log("Gameplay Loop ended after", roundCounter, "rounds.");
// }



startGame();
