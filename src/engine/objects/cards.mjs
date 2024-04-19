export const cards = [
  {
    name: "strike",
    properties: {
      target: 3,
      aggro: 2,
      health: -2,
      info: "2 damage to single enemy \n aggro:2"
    },
  },
  {
    name: "bandage",
    properties: {
      target: 0,
      aggro: 2,
      health: 3,
      info: "heals self for 3 \n aggro:2"
    },
  },
  {
    name: "heal",
    properties: {
      target: 2,
      aggro: 2,
      health: 2,
      info: "heals 2 to single ally \n aggro:2"
    },
  },
  {
    name: "shield",
    properties: {
      target: 2,
      aggro: 2,
      shield: 2,
      info: "shield 2 to single ally \n aggro:2"
    },
  },
  {
    name: "grapple",
    properties: {
      target: 3,
      aggro: 3,
      shield: -2,
      strengthen: -2,
      info: "shield -2 to single enemy \n strengthen -2 to single enemy \n aggro:3"
    },
  },
  {
    name: "plate armor",
    properties: {
      shield: 3,
      shot: 3,
      counter: 2,
      target: 0,
      aggro: 4,
      info: "shield 3 to self \n 2 shield 3 counters to self \n aggro:4"
    },
  },
  {
    name: "mirror shield",
    properties: {
      shield: 1,
      reflect: 1,
      counter: 1,
      target: 0,
      aggro: 4,
      info: "shield 1 to self \n 1 reflect counter to self \n aggro:4"
    },
  },
  {
    name: "rejuvinate",
    properties: {
      health: 2,
      counter: 3,
      hot: 2,
      target: 2,
      aggro: 3,
      info: "heal 2 to single ally \n 2 heal 2 counters to ally \n aggro:3"
    },
  },
  {
    name: "empower",
    properties: {
      shield: 1,
      strengthen: 1,
      target: 2,
      aggro: 2,
      info: "shield 1 to single ally \n strengthen 1 to single ally \n aggro:2"
    },
  },
  {
    name: "weaken",
    properties: {
      shield: -1,
      strengthen: -1,
      target: 3,
      aggro: 2,
      info: "shield -1 to single enemy \n strengthen -1 to single enemy \n aggro:2"
    },
  },
  {
    name: "poison",
    properties: {
      counter: 3,
      hot: -1,
      stot: -1,
      target: 3,
      aggro: 2,
      info: "3 strengthen -1 counters to single enemy \n 3 health -1 counters to single enemy \n aggro:2"
    },
  },
  {
    name: "venom blade",
    properties: {
      health: -2,
      counter: 2,
      hot: -1,
      stot: -1,
      target: 3,
      aggro: 3,
      info: "2 damage to single enemy \n 2 strengthen -1 counters\n to single enemy \n 2 health -1 counters to\n single enemy \n aggro:3"
    },
  },
  {
    name: "vanish",
    properties: {
      target: 0,
      aggro: -4,
      info: "aggro:-4 \n"
    },
  },
  {
    name: "mastermind",
    properties: {
      target: 0,
      aggro: 1,
      info: "draw 2 cards and play 1 \n aggro:1"
    },
  },
  {
    name: "flurry",
    properties: {
      target: 3,
      aggro: 1,
      info: "draw 2 cards and immediately \n play them against \n selected enemy \n aggro:1"
    },
  },
  {
    name: "explosive poison trap",
    properties: {
      target: 0,
      explosivePoisonTrap: 1,
      counter: 1,
      aggro: 3,
      info: "1 explosive poison trap counter on self \n when enemy targets this entity \n enemy recieves 10 damage and 2 health -2 counters \n aggro:3"
    },
  },
  {
    name: "paralyzing trap",
    properties: {
      target: 0,
      aggro: 3,
      paralyzingTrap: 1,
      counter: 1,
      info: "1 paralyzing trap counter on self \n when enemy targets this entity \n enemy recieves 2 interrupt counters \n aggro:3"
    },
  },
  {
    name: "disengage",
    properties: {
      target: 0,
      aggro: -2,
      info: " aggro:-2 \n"
    },
  },
  {
    name: "fireball",
    properties: {
      health: -5,
      counter: 1,
      hot: -1,
      target: 3,
      aggro: 3,
      info: "5 damage to single enemy \n 1 health -1 counter to enemy \n aggro:3"
    },
  },
  {
    name: "spell block",
    properties: {
      target: 3,
      aggro: 3,
      interrupt: 1,
      counter: 1,
      info: "1 interrupt counter to enemy \n aggro:3"
    },
  },
  {
    name: "freeze",
    properties: {
      health: -3,
      shield: 2,
      counter: 2,
      stot: -2,
      target: 3,
      aggro: 3,
      info: "3 damage to single enemy \n 2 shield 2 counter to enemy \n aggro:3"
    },
  },
  {
    name: "illusion",
    properties: {
      target: 0,
      aggro: 3,
      info: "create a copy of this player \n until end of round \n aggro:3"
    },
  },
  {
    name: "selfless sacrifice",
    properties: {
      health: 5,
      target: 2,
      aggro: 2,
      info: "heal 5 to single ally \n deal 3 damage to self \n aggro:2"
    },
  },
  {
    name: "siphon life",
    properties: {
      health: -3,
      target: 3,
      aggro: 3,
      info: "3 damage to single enemy \n 3 health to self \n aggro:3"
    },
  },
  {
    name: "taunt",
    properties: {
      target: 0,
      aggro: 5,
      info: "aggro:5 \n"
    },
  },
  {
    name: "slash",
    properties: {
      target: 3,
      health: -3,
      aggro: 2,
    },
  },
  {
    name: "evade",
    properties: {
      target: 0,
      shield: 2,
      aggro: 2,
    },
  },
  {
    name: "quick attack",
    properties: {
      target: 3,
      shield: -2,
      health: -1,
      aggro: 3,
    },
  },
  {
    name: "regenerate",
    properties: {
      target: 0,
      counter: 3,
      hot: 2,
      aggro: 3,
    },
  },
  {
    name: "block",
    properties: {
      target: 0,
      shield: 2,
      aggro: 2,
    },
  },
  {
    name: "rend armor",
    properties: {
      target: 3,
      shield: -5,
      aggro: 3,
      info: "-5 shield to single target \n aggro:3"
    },
  },
  {
    name: "scratch",
    properties: {
      target: 3,
      health: -3,
      shot: -1,
      counter: 2,
      aggro: 3,
      info: "3 damage to single target \n -1 health counters \n to single target \n aggro:3"
    },
  },
  {
    name: "bite",
    properties: {
      target: 3,
      health: -8,
      aggro: 3,
      info: "8 damage to single target \n aggro:3"
    },
  },
  {
    name: "swipe",
    properties: {
      target: 5,
      health: -3,
      shot: -1,
      stot: -1,
      counter: 2,
      aggro: 5,
      info: "5 damage to all enemies \n 3 -1 health counters \n to all enemies \n aggro:5"
    },
  },
  {
    name: "monster heal",
    properties: {
      target: 0,
      health: 10,
      aggro: 3,
      info: "10 health to self  \n aggro:3"
    },
  },
  {
    name: "crush",
    properties: {
      target: 3,
      health: -5,
      shot: -2,
      counter: 2,
      aggro: 3,
    },
  },
  {
    name: "throw rock",
    properties: {
      target: 3,
      health: -10,
      aggro: 4,
    },
  },
  {
    name: "stomp",
    properties: {
      target: 5,
      health: -3,
      shot: -2,
      stot: -2,
      counter: 2,
      aggro: 5,
    },
  },
  {
    name: "mind blast",
    properties: {
      target: 3,
      health: -5,
      counter: 1,
      hot: -3,
      aggro: 3,
    },
  },
  {
    name: "psychic scream",
    properties: {
      target: 5,
      health: -5,
      shot: -1,
      stot: -1,
      counter: 2,
      aggro: 4,
    },
  },
  {
    name: "debilitate",
    properties: {
      target: 5,
      shot: -1,
      stot: -2,
      counter: 3,
      aggro: 3,
    },
  },
  {
    name: "reconstitute",
    properties: {
      target: 0,
      counter: 3,
      hot: 5,
      aggro: 4,
    },
  },
  {
    name: "fire breath",
    properties: {
      target: 3,
      health: -10,
      counter: 1,
      hot: -5,
      aggro: 5,
    },
  },
  {
    name: "tail swipe",
    properties: {
      target: 5,
      health: -8,
      shot: -2,
      stot: -2,
      counter: 2,
      aggro: 5,
    },
  },
  {
    name: "wing gust",
    properties: {
      target: 5,
      shot: -3,
      stot: -3,
      counter: 3,
      aggro: 5,
    },
  },
  {
    name: "fiery regeneration",
    properties: {
      target: 0,
      counter: 3,
      hot: 10,
      aggro: 5,
    },
  },
  {
    name: "lycanthropy",
    properties: {
      target: 0,
      counter: 3,
      lycanthropy: 1,
      aggro: 0,
    },
  },
  {
    name: "lycanthropic bite",
    properties: {
      target: 1,
      health: -8,
      aggro: 3,
      counter: 3,
      lycanthropy: 1,
      info: "8 damage to single target \n 3 lycanthropy counters \n to single target \n aggro:3"
    },
  },
  {
    name: "vampiric bite",
    properties: {
      target: 3,
      health: -8,
      aggro: 3,
      counter: 3,
      vampirism: 1,
      info: "8 damage to single target \n 3 vampirism counters \n to single target \n aggro:3"
    },
  },
];
