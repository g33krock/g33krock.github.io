export const entities = [
  {
    role: "onion knight",
    health: 20,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "player",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 1,
    defaultDeck: [
      { cardName: "strike", frequency: 5 },
      { cardName: "bandage", frequency: 5 },
      { cardName: "shield", frequency: 5 },
      { cardName: "disengage", frequency: 5 },
    ],
  },
  {
    role: "warrior",
    health: 30,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "player",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 3,
    defaultDeck: [
      { cardName: "strike", frequency: 4 },
      { cardName: "bandage", frequency: 2 },
      { cardName: "shield", frequency: 3 },
      { cardName: "disengage", frequency: 2 },
      { cardName: "grapple", frequency: 2 },
      { cardName: "plate armor", frequency: 2 },
      { cardName: "mirror shield", frequency: 2 },
      { cardName: "taunt", frequency: 3 },
    ],
  },
  {
    role: "cleric",
    health: 15,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "player",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 3,
    defaultDeck: [
      { cardName: "rejuvinate", frequency: 3 },
      { cardName: "empower", frequency: 3 },
      { cardName: "weaken", frequency: 3 },
      { cardName: "disengage", frequency: 2 },
      { cardName: "strike", frequency: 3 },
      { cardName: "heal", frequency: 6 },
    ],
  },
  {
    role: "rogue",
    health: 20,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "player",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 3,
    defaultDeck: [
      { cardName: "poison", frequency: 4 },
      { cardName: "venom blade", frequency: 3 },
      { cardName: "mastermind", frequency: 2 },
      { cardName: "vanish", frequency: 2 },
      { cardName: "strike", frequency: 5 },
      { cardName: "flurry", frequency: 2 },
      { cardName: "explosive poison trap", frequency: 1 },
      { cardName: "paralyzing trap", frequency: 1 },
    ],
  },
  {
    role: "mage",
    health: 15,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "player",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 3,
    defaultDeck: [
      { cardName: "strike", frequency: 3 },
      { cardName: "fireball", frequency: 4 },
      { cardName: "freeze", frequency: 4 },
      { cardName: "spell block", frequency: 2 },
      { cardName: "illusion", frequency: 1 },
      { cardName: "disengage", frequency: 4 },
      { cardName: "shield", frequency: 2 },
    ],
  },
  {
    role: "paladin",
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "player",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 3,
    defaultDeck: [
      { cardName: "strike", frequency: 6 },
      { cardName: "selfless sacrifice", frequency: 2 },
      { cardName: "heal", frequency: 4 },
      { cardName: "rejuvinate", frequency: 3 },
      { cardName: "disengage", frequency: 2 },
      { cardName: "grapple", frequency: 3 },
    ],
  },
  {
    role: "druid",
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "player",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 3,
    defaultDeck: [
      { cardName: "strike", frequency: 3 },
      { cardName: "poison", frequency: 4 },
      { cardName: "heal", frequency: 4 },
      { cardName: "rejuvinate", frequency: 3 },
      { cardName: "disengage", frequency: 3 },
      { cardName: "grapple", frequency: 3 },
    ],
  },
  {
    role: "death knight",
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 10,
    effects: [],
    faction: "player",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 3,
    defaultDeck: [
      { cardName: "strike", frequency: 4 },
      { cardName: "siphon life", frequency: 2 },
      { cardName: "shield", frequency: 2 },
      { cardName: "disengage", frequency: 2 },
      { cardName: "grapple", frequency: 2 },
      { cardName: "plate armor", frequency: 2 },
      { cardName: "freeze", frequency: 3 },
      { cardName: "taunt", frequency: 3 },
    ],
  },
  {
    role: "goblin",
    health: 10,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 1,
    defaultDeck: [
      { cardName: "slash", frequency: 8 },
      { cardName: "evade", frequency: 6 },
      { cardName: "quick attack", frequency: 5 },
      { cardName: "regenerate", frequency: 1 },
    ],
  },
  {
    role: "skeleton",
    health: 15,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 2,
    defaultDeck: [
      { cardName: "slash", frequency: 8 },
      { cardName: "block", frequency: 6 },
      { cardName: "rend armor", frequency: 5 },
      { cardName: "regenerate", frequency: 1 },
    ],
  },
  {
    role: "werewolf",
    health: 20,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 4,
    defaultDeck: [
      { cardName: "scratch", frequency: 8 },
      { cardName: "bite", frequency: 6 },
      { cardName: "swipe", frequency: 5 },
      { cardName: "monster heal", frequency: 1 },
    ],
  },
  {
    role: "ogre",
    health: 35,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 6,
    defaultDeck: [
      { cardName: "crush", frequency: 8 },
      { cardName: "throw rock", frequency: 6 },
      { cardName: "stomp", frequency: 5 },
      { cardName: "monster heal", frequency: 1 },
    ],
  },
  {
    role: "mind flayer",
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 9,
    defaultDeck: [
      { cardName: "mind blast", frequency: 8 },
      { cardName: "psychic scream", frequency: 6 },
      { cardName: "debilitate", frequency: 5 },
      { cardName: "reconstitute", frequency: 1 },
    ],
  },
  {
    role: "dragon",
    health: 50,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    flameShield: false,
    frostShield: false,
    arcaneShield: false,
    aggroLife: false,
    power: 12,
    defaultDeck: [
      { cardName: "fire breath", frequency: 8 },
      { cardName: "tail swipe", frequency: 6 },
      { cardName: "wing gust", frequency: 5 },
      { cardName: "fiery regeneration", frequency: 1 },
    ],
  },
];