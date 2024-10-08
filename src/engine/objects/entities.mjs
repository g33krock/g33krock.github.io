export const entities = [
  {
    role: "warrior",
    types: ["physical", "earth"],
    health: 30,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 1,
    speed: 5, // Average speed, balanced between strength and agility
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
    types: ["light", "nature"],
    health: 15,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 1,
    speed: 7, // Slightly slower, focus is more on healing and support
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
    types: ["poison", "dark"],
    health: 20,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 1,
    speed: 2, // Very fast, agile, and stealthy
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
    types: ["arcane", "fire"],
    health: 15,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 1,
    speed: 6, // Moderate speed, focuses on casting spells
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
    types: ["light", "physical"],
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 1,
    speed: 4, // Strong, a bit slower but still mobile due to balanced combat and healing abilities
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
    types: ["nature", "poison"],
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 1,
    speed: 5, // Balance between support and nature spells
    defaultDeck: [
      { cardName: "strike", frequency: 3 },
      { cardName: "poison", frequency: 4 },
      { cardName: "heal", frequency: 4 },
      { cardName: "rejuvinate", frequency: 3 },
      { cardName: "disengage", frequency: 3 },
      { cardName: "summon spirit", frequency: 3 },
    ],
  },
  {
    role: "death knight",
    types: ["dark", "frost"],
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 1,
    speed: 6, // Slower, but focused on survivability and frost magic
    defaultDeck: [
      { cardName: "strike", frequency: 4 },
      { cardName: "siphon life", frequency: 2 },
      { cardName: "shield", frequency: 2 },
      { cardName: "grapple", frequency: 2 },
      { cardName: "plate armor", frequency: 2 },
      { cardName: "freeze", frequency: 3 },
      { cardName: "taunt", frequency: 5 },
    ],
  },
  {
    role: "bard",
    types: ["arcane", "light"],
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 1,
    speed: 5, // Average speed, uses music-based abilities
    defaultDeck: [
      { cardName: "strike", frequency: 4 },
      { cardName: "humiliate", frequency: 2 },
      { cardName: "shield", frequency: 2 },
      { cardName: "healing word", frequency: 2 },
      { cardName: "power chord", frequency: 4 },
      { cardName: "inspiring medley", frequency: 3 },
      { cardName: "cutting remark", frequency: 5 },
    ],
  },
  {
    role: "goblin",
    types: ["physical", "dark"],
    health: 10,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 1,
    speed: 3, // Small and quick, low health
    defaultDeck: [
      { cardName: "slash", frequency: 8 },
      { cardName: "quick attack", frequency: 5 },
      { cardName: "regenerate", frequency: 1 },
    ],
  },
  {
    role: "skeleton",
    types: ["dark", "physical"],
    health: 15,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 2,
    speed: 6, // Slower, as it's undead
    defaultDeck: [
      { cardName: "slash", frequency: 8 },
      { cardName: "block", frequency: 6 },
      { cardName: "rend armor", frequency: 5 },
      { cardName: "regenerate", frequency: 1 },
    ],
  },
  {
    role: "vampire",
    types: ["dark", "blood"],
    health: 15,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 3,
    speed: 4, // Agile and fast, but not as fast as the rogue
    defaultDeck: [
      { cardName: "scratch", frequency: 4 },
      { cardName: "vampiric bite", frequency: 10 },
      { cardName: "debilitate", frequency: 4 },
      { cardName: "reconstitute", frequency: 2 },
    ],
  },
  {
    role: "werewolf",
    types: ["dark", "nature"],
    health: 20,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 3,
    speed: 3, // Very fast, animalistic strength and agility
    defaultDeck: [
      { cardName: "strike", frequency: 3 },
      { cardName: "bandage", frequency: 2 },
      { cardName: "shield", frequency: 3 },
      { cardName: "disengage", frequency: 2 },
      { cardName: "lycanthropy", frequency: 10 },
    ],
  },
  {
    role: "orc",
    types: ["physical", "earth"],
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 3,
    speed: 7, // Slower, heavy-hitting brute
    defaultDeck: [
      { cardName: "scratch", frequency: 3 },
      { cardName: "bite", frequency: 3 },
      { cardName: "swipe", frequency: 3 },
      { cardName: "monster heal", frequency: 1 },
    ],
  },
  {
    role: "ogre",
    types: ["earth", "physical"],
    health: 35,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 6,
    speed: 8, // Very slow, but incredibly strong
    defaultDeck: [
      { cardName: "crush", frequency: 8 },
      { cardName: "throw rock", frequency: 6 },
      { cardName: "stomp", frequency: 5 },
      { cardName: "monster heal", frequency: 1 },
    ],
  },
  {
    role: "mindflayer",
    types: ["psychic", "dark"],
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 9,
    speed: 4, // Slow due to psychic nature, but devastating
    defaultDeck: [
      { cardName: "mind blast", frequency: 8 },
      { cardName: "psychic scream", frequency: 6 },
      { cardName: "debilitate", frequency: 5 },
      { cardName: "reconstitute", frequency: 1 },
    ],
  },
  {
    role: "dragon",
    types: ["fire", "arcane"],
    health: 50,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 12,
    speed: 7, // Large and powerful, but slower in movement
    defaultDeck: [
      { cardName: "fire breath", frequency: 8 },
      { cardName: "tail swipe", frequency: 6 },
      { cardName: "wing gust", frequency: 5 },
      { cardName: "fiery regeneration", frequency: 1 },
    ],
  },
  {
    role: "elemental",
    types: ["fire", "earth"],
    health: 20,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 4,
    speed: 5, // Average speed, elemental balance
    defaultDeck: [
      { cardName: "flame wave", frequency: 4 },
      { cardName: "earthquake", frequency: 4 },
      { cardName: "rock shield", frequency: 3 },
      { cardName: "magma surge", frequency: 3 },
    ],
  },
  {
    role: "necromancer",
    types: ["dark", "arcane"],
    health: 18,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    power: 6,
    speed: 6, // Focus on raising undead, not fast-moving
    defaultDeck: [
      { cardName: "dark reaping", frequency: 4 },
      { cardName: "summon skeleton", frequency: 3 },
      { cardName: "arcane barrier", frequency: 3 },
      { cardName: "soul drain", frequency: 4 },
    ],
  },
  {
    role: "phoenix",
    types: ["fire", "light"],
    health: 22,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 5,
    speed: 3, // Very fast and agile due to its nature
    defaultDeck: [
      { cardName: "phoenix flame", frequency: 4 },
      { cardName: "rebirth", frequency: 2 },
      { cardName: "blazing aura", frequency: 4 },
      { cardName: "healing flame", frequency: 2 },
    ],
  },
  {
    role: "shaman",
    types: ["nature", "psychic"],
    health: 20,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 2,
    speed: 5, // Balanced speed for spiritual connection
    defaultDeck: [
      { cardName: "spirit link", frequency: 4 },
      { cardName: "healing rain", frequency: 3 },
      { cardName: "totem summon", frequency: 3 },
      { cardName: "mind cleanse", frequency: 3 },
      { cardName: "strike", frequency: 3 },
      { cardName: "disengage", frequency: 3 },
    ],
  },
  {
    role: "berserker",
    types: ["physical", "blood"],
    health: 28,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "hero",
    alive: true,
    proficiency: {},
    locked: false,
    power: 3,
    speed: 4, // Fast due to its frenzied nature
    defaultDeck: [
      { cardName: "frenzy", frequency: 4 },
      { cardName: "blood rage", frequency: 4 },
      { cardName: "reckless strike", frequency: 4 },
      { cardName: "self-heal", frequency: 2 },
    ],
  },
  {
    "role": "warlord",
    "types": ["physical", "earth"],
    "health": 40,
    "shield": 10,
    "strengthen": 2,
    "aggro": 5,
    "effects": [],
    "faction": "monster",
    "alive": true,
    "proficiency": {},
    "power": 6,
    "speed": 6,
    "defaultDeck": [
      { cardName: "crushing blow", frequency: 5 },
      { cardName: "shield wall", frequency: 2 },
      { cardName: "taunt", frequency: 3 },
      { cardName: "war cry", frequency: 4 }
    ]
  },
  {
    "role": "veteran mercenary",
    "types": ["physical", "earth"],
    "health": 35,
    "shield": 5,
    "strengthen": 2,
    "aggro": 4,
    "effects": [],
    "faction": "monster",
    "alive": true,
    "proficiency": {},
    "power": 5,
    "speed": 5,
    "defaultDeck": [
      { cardName: "shield bash", frequency: 4 },
      { cardName: "strike", frequency: 5 },
      { cardName: "block", frequency: 3 },
      { cardName: "disengage", frequency: 2 }
    ]
  },
  {
    "role": "champion gladiator",
    "types": ["physical", "earth"],
    "health": 45,
    "shield": 8,
    "strengthen": 3,
    "aggro": 6,
    "effects": [],
    "faction": "boss",
    "alive": true,
    "proficiency": {},
    "power": 7,
    "speed": 6,
    "defaultDeck": [
      { cardName: "overhead strike", frequency: 6 },
      { cardName: "block", frequency: 4 },
      { cardName: "gladiator's roar", frequency: 3 },
      { cardName: "crush armor", frequency: 3 }
    ]
  },
  {
    "role": "high priest",
    "types": ["light", "arcane"],
    "health": 25,
    "shield": 0,
    "strengthen": 3,
    "aggro": 0,
    "effects": [],
    "faction": "monster",
    "alive": true,
    "proficiency": {},
    "power": 5,
    "speed": 4,
    "defaultDeck": [
      { cardName: "divine strike", frequency: 4 },
      { cardName: "holy shield", frequency: 2 },
      { cardName: "purge", frequency: 3 },
      { cardName: "revive", frequency: 2 }
    ]
  },
  {
    "role": "fallen paladin",
    "types": ["dark", "physical"],
    "health": 35,
    "shield": 10,
    "strengthen": 2,
    "aggro": 3,
    "effects": [],
    "faction": "monster",
    "alive": true,
    "proficiency": {},
    "power": 6,
    "speed": 5,
    "defaultDeck": [
      { cardName: "dark strike", frequency: 5 },
      { cardName: "dark blessing", frequency: 3 },
      { cardName: "shield block", frequency: 2 },
      { cardName: "taunt", frequency: 3 }
    ]
  },
  {
    "role": "corrupted deity",
    "types": ["light", "dark"],
    "health": 50,
    "shield": 15,
    "strengthen": 4,
    "aggro": 6,
    "effects": [],
    "faction": "boss",
    "alive": true,
    "proficiency": {},
    "power": 8,
    "speed": 5,
    "defaultDeck": [
      { cardName: "divine wrath", frequency: 6 },
      { cardName: "dark pulse", frequency: 4 },
      { cardName: "holy strike", frequency: 3 },
      { cardName: "shield of corruption", frequency: 2 }
    ]
  },
  {
    "role": "archmage",
    "types": ["arcane", "fire"],
    "health": 40,
    "shield": 5,
    "strengthen": 2,
    "aggro": 3,
    "effects": [],
    "faction": "boss",
    "alive": true,
    "proficiency": {},
    "power": 7,
    "speed": 4,
    "defaultDeck": [
      { cardName: "fireball", frequency: 5 },
      { cardName: "arcane blast", frequency: 4 },
      { cardName: "elemental shield", frequency: 3 },
      { cardName: "ignite", frequency: 2 }
    ]
  },
  {
    "role": "dread knight",
    "types": ["dark", "physical"],
    "health": 45,
    "shield": 10,
    "strengthen": 3,
    "aggro": 5,
    "effects": [],
    "faction": "boss",
    "alive": true,
    "proficiency": {},
    "power": 8,
    "speed": 6,
    "defaultDeck": [
      { cardName: "dark strike", frequency: 5 },
      { cardName: "lifedrain", frequency: 4 },
      { cardName: "dark shield", frequency: 3 },
      { cardName: "curse", frequency: 2 }
    ]
  },
  {
    "role": "elemental overlord",
    "types": ["fire", "earth"],
    "health": 60,
    "shield": 20,
    "strengthen": 5,
    "aggro": 8,
    "effects": [],
    "faction": "boss",
    "alive": true,
    "proficiency": {},
    "power": 10,
    "speed": 7,
    "defaultDeck": [
      { cardName: "magma strike", frequency: 6 },
      { cardName: "earthquake", frequency: 5 },
      { cardName: "flame shield", frequency: 4 },
      { cardName: "crush", frequency: 3 }
    ]
  },
  {
    "role": "blood berserker",
    "types": ["blood", "physical"],
    "health": 55,
    "shield": 10,
    "strengthen": 6,
    "aggro": 7,
    "effects": [],
    "faction": "boss",
    "alive": true,
    "proficiency": {},
    "power": 9,
    "speed": 6,
    "defaultDeck": [
      { cardName: "frenzied strike", frequency: 6 },
      { cardName: "blood rage", frequency: 5 },
      { cardName: "savage strike", frequency: 4 },
      { cardName: "self-heal", frequency: 3 }
    ]
  },
  {
    role: "street thug",
    types: ["physical", "dark"],
    health: 15,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 2,
    speed: 6,
    defaultDeck: [
      { cardName: "strike", frequency: 4 },
      { cardName: "quick attack", frequency: 2 }
    ]
  },
  {
    role: "pickpocket",
    types: ["dark", "wind"],
    health: 10,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 1,
    speed: 8,
    defaultDeck: [
      { cardName: "strike", frequency: 3 },
      { cardName: "evade", frequency: 3 }
    ]
  },
  {
    role: "shadow assassin",
    types: ["dark", "poison"],
    health: 18,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 4,
    speed: 3,
    defaultDeck: [
      { cardName: "venom blade", frequency: 3 },
      { cardName: "disengage", frequency: 2 }
    ]
  },
  {
    role: "trap setter",
    types: ["poison", "physical"],
    health: 12,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 2,
    speed: 5,
    defaultDeck: [
      { cardName: "explosive poison trap", frequency: 2 },
      { cardName: "paralyzing trap", frequency: 2 }
    ]
  },
  {
    role: "guild enforcer",
    types: ["physical", "dark"],
    health: 22,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 3,
    speed: 5,
    defaultDeck: [
      { cardName: "strike", frequency: 4 },
      { cardName: "grapple", frequency: 2 }
    ]
  },
  {
    role: "dagger thrower",
    types: ["poison", "physical"],
    health: 12,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 2,
    speed: 6,
    defaultDeck: [
      { cardName: "strike", frequency: 2 },
      { cardName: "poison", frequency: 2 }
    ]
  },
  {
    role: "vault protector",
    types: ["arcane", "physical"],
    health: 25,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 4,
    speed: 5,
    defaultDeck: [
      { cardName: "shield", frequency: 3 },
      { cardName: "strike", frequency: 3 }
    ]
  },
  {
    role: "silent blade",
    types: ["dark", "poison"],
    health: 20,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 3,
    speed: 4,
    defaultDeck: [
      { cardName: "venom blade", frequency: 3 },
      { cardName: "paralyzing trap", frequency: 2 }
    ]
  },
  {
    role: "vault mage",
    types: ["arcane", "fire"],
    health: 20,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 5,
    speed: 6,
    defaultDeck: [
      { cardName: "fireball", frequency: 4 },
      { cardName: "arcane barrier", frequency: 2 }
    ]
  },
  {
    role: "poison expert",
    types: ["poison", "dark"],
    health: 15,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 3,
    speed: 4,
    defaultDeck: [
      { cardName: "poison", frequency: 4 },
      { cardName: "venom blade", frequency: 2 }
    ]
  },
  {
    role: "corrupted wolf",
    types: ["dark", "nature"],
    health: 18,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 3,
    speed: 5,
    defaultDeck: [
      { cardName: "slash", frequency: 3 },
      { cardName: "quick attack", frequency: 2 }
    ]
  },
  {
    role: "treant",
    types: ["nature", "earth"],
    health: 40,
    shield: 0,
    strengthen: 0,
    aggro: 0,
    effects: [],
    faction: "monster",
    alive: true,
    proficiency: {},
    power: 4,
    speed: 9,
    defaultDeck: [
      { cardName: "earthquake", frequency: 4 },
      { cardName: "strike", frequency: 2 }
    ]
  }
];
