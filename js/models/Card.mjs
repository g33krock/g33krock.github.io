//cards.mjs

class Card {
  constructor(name, properties) {
    this.name = name;
    this.player = properties.player ? [...properties.player] : [0];
    this.target = properties.target;
    this.aggro = properties.aggro;
    this.health = properties.health || 0;
    this.hot = properties.hot || 0;
    this.shield = properties.shield || 0;
    this.shot = properties.shot || 0;
    this.strengthen = properties.strengthen || 0;
    this.stot = properties.stot || 0;
    this.reflect = properties.reflect || 0;
    this.counter = properties.counter || 0;
    this.interrupt = properties.interrupt || 0;
    this.explosivePoisonTrap = properties.explosivePoisonTrap || 0;
    this.paralyzingTrap = properties.paralyzingTrap || 0;
  }
}

export const availableCards = [];

const selectedRoles = JSON.parse(localStorage.getItem('selectedRoles') || '[]');


function addCard(name, properties) {
  const newCard = new Card(name, properties);
  availableCards.push(newCard);
}

//targeting: self = 0, single = 1, allies = 2, enemies = 3, all = 4
//player: any = 0, warrior = 1, cleric = 2, rogue = 3, mage = 4, paladin = 5

addCard("strike", { 
  health: -2, 
  target: 1, 
  aggro: 2, 
  player: ['Any'] 
});
addCard("bandage", { 
  health: 3, 
  target: 0, 
  aggro: 2, 
  player: ['Warrior'] 
});
addCard("heal", { 
  health: 2, 
  target: 1, 
  aggro: 2, 
  player: ['Cleric', 'Paladin', 'Druid'] 
});
addCard("shield", { 
  shield: 2, 
  target: 1, 
  aggro: 2, 
  player: ['Warrior', 'Paladin', 'DeathKnight'] 
});
addCard("grapple", {
  strengthen: -2,
  target: 1,
  aggro: 3,
  player: ['Warrior'],
});
addCard("plate armor", {
  shield: 3,
  shot: 3,
  counter: 2,
  target: 0,
  aggro: 4,
  player: ['Warrior', 'Paladin'],
});
addCard("mirror shield", {
  shield: 1,
  reflect: 1,
  counter: 1,
  target: 0,
  aggro: 4,
  player: ['Warrior'],
});
addCard("rejuvinate", {
  counter: 3,
  hot: 2,
  target: 1,
  aggro: 2,
  player: ['Cleric', 'Druid'],
});
addCard("empower", {
  shield: 1,
  strengthen: 1,
  target: 1,
  aggro: 2,
  player: ['Cleric', 'Paladin'],
});
addCard("weaken", {
  shield: -1,
  strengthen: -1,
  target: 1,
  aggro: 2,
  player: ['Cleric', 'DeathKnight'],
});
addCard("poison", {
  counter: 3,
  hot: -1,
  stot: -1,
  target: 1,
  aggro: 2,
  player: ['Rogue', 'DeathKnight', 'Druid'],
});
addCard("venom blade", {
  health: -2,
  counter: 2,
  hot: -1,
  stot: -1,
  target: 1,
  aggro: 3,
  player: ['Rogue'],
});
addCard("vanish", { 
  target: 0, 
  aggro: -4, 
  player: ['Rogue'] 
});
addCard("mastermind", { 
  target: 0, 
  aggro: 1,
  player: ['Rogue'] 
});
addCard("flurry", { 
  target: 1, 
  aggro: 1,
  player: ['Rogue'] 
});
addCard("explosive poison trap", { 
  target: 0, 
  explosivePoisonTrap: 1,
  counter: 1,
  aggro: 3,
  player: ['Rogue'] 
});
addCard("paralyzing trap", { 
  target: 0, 
  aggro: 3,
  paralyzingTrap: 1,
  counter: 1,
  player: ['Rogue'] 
});
addCard("disengage", { 
  target: 0, 
  aggro: -2, 
  player: ['Warrior', 'Cleric', 'Mage', 'Paladin', 'Druid', 'DeathKnight'] 
});
addCard("fireball", {
  health: -5,
  counter: 1,
  hot: -1,
  target: 1,
  aggro: 2,
  player: ['Mage'],
});
addCard("spell block", { 
  target: 1, 
  aggro: 1,
  interrupt: 1,
  counter: 1,
  player: ['Mage'] 
});
addCard("freeze", {
  health: -3,
  shield: 2,
  counter: 2,
  stot: -2,
  target: 1,
  aggro: 3,
  player: ['Mage', 'DeathKnight'],
});
addCard("illusion", {
  target: 0,
  aggro: 3,
  player: ['Mage']
});
addCard("selfless sacrifice", {
  health: 5,
  target: 1,
  aggro: 2,
  player: ['Paladin'],
});
addCard("siphon life", {
  health: -3,
  target: 1,
  aggro: 3,
  player: ['DeathKnight'],
});
addCard("taunt", { 
  target: 0, 
  aggro: 5, 
  player: ['Warrior', 'DeathKnight'] 
});

const playerOneDiscard = [];
const playerTwoDiscard = [];
const playerThreeDiscard = [];
const playerFourDiscard = [];
const playerFiveDiscard = [];

export const playerDecks = [];

selectedRoles.map(role => {
  playerDecks.push({ deck: [], playerNumber: role })
})
export const playerDiscards = [
  playerOneDiscard,
  playerTwoDiscard,
  playerThreeDiscard,
  playerFourDiscard,
  playerFiveDiscard,
];

export function buildDeck(availableCards, playerDeck) {
  const deckCards = []; 
  availableCards.forEach((card) => {
      if (card.player.includes(playerDeck.playerNumber) || card.player.includes('Any')) {
          for (let i = 2; i > 0; i--) {
              deckCards.push(card);
          }
      }
  });

  shuffleArray(deckCards);

  playerDeck.deck = deckCards;  
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

function buildAllDecks(numberOfRoles){
  for (let i = numberOfRoles-1; i >= 0; i--){
    buildDeck(availableCards, playerDecks[i]);
  }
}


export function isDeckEmpty(playerDeck) {
  return playerDeck.deck.length < 2;
}

buildAllDecks(selectedRoles.length)
