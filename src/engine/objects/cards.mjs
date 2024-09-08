import { proficiencies } from "./proficiencies.mjs";

export const cards = [
  {
    name: "strike",
    properties: {
      types: ["physical", "earth"],
      target: 3,
      aggro: 2,
      health: -2,
      info: "2 damage to single enemy \n aggro:2"
    },
  },
  {
    name: "bandage",
    properties: {
      types: ["nature", "light"],
      target: 0,
      aggro: 2,
      health: 3,
      info: "heals self for 3 \n aggro:2"
    },
  },
  {
    name: "heal",
    properties: {
      types: ["light", "nature"],
      target: 2,
      aggro: 2,
      health: 2,
      info: "heals 2 to single ally \n aggro:2"
    },
  },
  {
    name: "humiliate",
    properties: {
      types: ["psychic", "dark"],
      target: 3,
      aggro: 4,
      health: -2,
      strengthen: -4,
      info: "damage 2 to single enemy \n weaken 5 to a single enemy \n  aggro:4"
    },
  },
  {
    name: "cutting remark",
    properties: {
      types: ["psychic", "dark"],
      target: 3,
      aggro: 2,
      health: -1,
      strengthen: -1,
      info: "damage 1 to single enemy \n weaken 1 to a single enemy \n  aggro:2"
    },
  },
  {
    name: "power chord",
    properties: {
      types: ["arcane", "light"],
      target: 4,
      aggro: 2,
      health: 1,
      strengthen: 1,
      info: "strengthen 1 to single ally \n heal 1 to a single ally \n  aggro:2"
    },
  },
  {
    name: "inspiring medley",
    properties: {
      types: ["arcane", "light"],
      target: 4,
      aggro: 3,
      health: 1,
      strengthen: 1,
      info: "heal 1 to all allies \n strengthen 1 to all allies \n  aggro:3"
    },
  },
  {
    name: "shield",
    properties: {
      types: ["earth", "arcane"],
      target: 2,
      aggro: 2,
      shield: 2,
      info: "shield 2 to single ally \n aggro:2"
    },
  },
  {
    name: "shield all",
    properties: {
      types: ["earth", "arcane"],
      target: 4,
      aggro: 4,
      shield: 2,
      info: "shield 2 to all allies \n aggro:4"
    },
  },
  {
    name: "grapple",
    properties: {
      types: ["physical", "earth"],
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
      types: ["earth", "physical"],
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
      types: ["arcane", "earth"],
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
      types: ["nature", "light"],
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
      types: ["light", "arcane"],
      shield: 1,
      strengthen: 1,
      target: 2,
      aggro: 2,
      info: "shield 1 to single ally \n strengthen 1 to single ally \n aggro:2"
    },
  },
  {
    name: "strengthen all",
    properties: {
      types: ["light", "arcane"],
      strengthen: 2,
      target: 4,
      aggro: 4,
      info: "strengthen 2 to all allies \n aggro:2"
    },
  },
  {
    name: "weaken",
    properties: {
      types: ["psychic", "dark"],
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
      types: ["poison", "dark"],
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
      types: ["poison", "physical"],
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
      types: ["arcane", "wind"],
      target: 0,
      aggro: -4,
      info: "aggro:-4 \n"
    },
  },
  {
    name: "mastermind",
    properties: {
      types: ["psychic", "arcane"],
      target: 0,
      aggro: 1,
      info: "draw 2 cards and play 1 \n aggro:1"
    },
  },
  {
    name: "flurry",
    properties: {
      types: ["physical", "wind"],
      target: 3,
      aggro: 1,
      info: "draw 2 cards and immediately \n play them against \n selected enemy \n aggro:1"
    },
  },
  {
    name: "explosive poison trap",
    properties: {
      types: ["poison", "fire"],
      target: 0,
      explosivePoisonTrap: 1,
      counter: 1,
      aggro: 3,
      info: "1 explosive poison trap counter on self \n when enemy targets this entity \n enemy receives 10 damage and 2 health -2 counters \n aggro:3"
    },
  },
  {
    name: "paralyzing trap",
    properties: {
      types: ["poison", "psychic"],
      target: 0,
      aggro: 3,
      paralyzingTrap: 1,
      counter: 1,
      info: "1 paralyzing trap counter on self \n when enemy targets this entity \n enemy receives 2 interrupt counters \n aggro:3"
    },
  },
  {
    name: "disengage",
    properties: {
      types: ["wind", "arcane"],
      target: 0,
      aggro: -2,
      info: "aggro:-2 \n"
    },
  },
  {
    name: "fireball",
    properties: {
      types: ["fire", "arcane"],
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
      types: ["arcane", "psychic"],
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
      types: ["frost", "arcane"],
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
      types: ["arcane", "psychic"],
      target: 0,
      aggro: 3,
      info: "create a copy of this player \n until end of round \n aggro:3"
    },
  },
  {
    name: "selfless sacrifice",
    properties: {
      types: ["light", "blood"],
      health: 5,
      target: 2,
      aggro: 2,
      info: "heal 5 to single ally \n deal 3 damage to self \n aggro:2"
    },
  },
  {
    name: "siphon life",
    properties: {
      types: ["dark", "blood"],
      health: -3,
      target: 3,
      aggro: 3,
      info: "3 damage to single enemy \n 3 health to self \n aggro:3"
    },
  },
  {
    name: "taunt",
    properties: {
      types: ["physical", "earth"],
      target: 0,
      aggro: 5,
      info: "aggro:5 \n"
    },
  },
  {
    name: "slash",
    properties: {
      types: ["physical", "wind"],
      target: 3,
      health: -3,
      aggro: 2,
    },
  },
  {
    name: "evade",
    properties: {
      types: ["wind", "arcane"],
      target: 0,
      shield: 2,
      aggro: 2,
    },
  },
  {
    name: "quick attack",
    properties: {
      types: ["physical", "wind"],
      target: 3,
      shield: -2,
      health: -1,
      aggro: 3,
    },
  },
  {
    name: "regenerate",
    properties: {
      types: ["nature", "light"],
      target: 0,
      counter: 3,
      hot: 2,
      aggro: 3,
    },
  },
  {
    name: "block",
    properties: {
      types: ["earth", "physical"],
      target: 0,
      shield: 2,
      aggro: 2,
    },
  },
  {
    name: "rend armor",
    properties: {
      types: ["physical", "earth"],
      target: 3,
      shield: -5,
      aggro: 3,
      info: "-5 shield to single target \n aggro:3"
    },
  },
  {
    name: "scratch",
    properties: {
      types: ["physical", "dark"],
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
      types: ["physical", "dark"],
      target: 3,
      health: -8,
      aggro: 3,
      info: "8 damage to single target \n aggro:3"
    },
  },
  {
    name: "swipe",
    properties: {
      types: ["physical", "earth"],
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
      types: ["nature", "dark"],
      target: 0,
      health: 10,
      aggro: 3,
      info: "10 health to self  \n aggro:3"
    },
  },
  {
    name: "crush",
    properties: {
      types: ["physical", "earth"],
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
      types: ["earth", "physical"],
      target: 3,
      health: -10,
      aggro: 4,
    },
  },
  {
    name: "stomp",
    properties: {
      types: ["earth", "physical"],
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
      types: ["psychic", "arcane"],
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
      types: ["psychic", "dark"],
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
      types: ["psychic", "dark"],
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
      types: ["nature", "dark"],
      target: 0,
      counter: 3,
      hot: 5,
      aggro: 4,
    },
  },
  {
    name: "fire breath",
    properties: {
      types: ["fire", "wind"],
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
      types: ["physical", "earth"],
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
      types: ["wind", "arcane"],
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
      types: ["fire", "light"],
      target: 0,
      counter: 3,
      hot: 10,
      aggro: 5,
    },
  },
  {
    name: "lycanthropy",
    properties: {
      types: ["dark", "nature"],
      target: 0,
      counter: 3,
      lycanthropy: 1,
      aggro: 0,
    },
  },
  {
    name: "lycanthropic bite",
    properties: {
      types: ["dark", "physical"],
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
      types: ["dark", "blood"],
      target: 3,
      health: -8,
      aggro: 3,
      counter: 3,
      vampirism: 1,
      info: "8 damage to single target \n 3 vampirism counters \n to single target \n aggro:3"
    },
  },
  {
    name: "flame wave",
    properties: {
      types: ["fire", "wind"],
      target: 5,
      aggro: 3,
      health: -3,
      info: "3 damage to all enemies \n aggro:3"
    },
  },
  {
    name: "earthquake",
    properties: {
      types: ["earth", "physical"],
      target: 5,
      aggro: 4,
      health: -4,
      shield: -2,
      info: "4 damage to all enemies \n -2 shield to all enemies \n aggro:4"
    },
  },
  {
    name: "rock shield",
    properties: {
      types: ["earth", "light"],
      target: 2,
      aggro: 2,
      shield: 4,
      info: "4 shield to single ally \n aggro:2"
    },
  },
  {
    name: "magma surge",
    properties: {
      types: ["fire", "earth"],
      target: 3,
      aggro: 4,
      health: -5,
      hot: -2,
      info: "5 damage to single enemy \n 2 health -2 counters to enemy \n aggro:4"
    },
  },
  {
    name: "dark reaping",
    properties: {
      types: ["dark", "psychic"],
      target: 3,
      aggro: 3,
      health: -4,
      info: "4 damage to single enemy \n aggro:3"
    },
  },
  {
    name: "summon skeleton",
    properties: {
      types: ["dark", "arcane"],
      target: 0,
      aggro: 3,
      summon: {amount: 1, type: "skeleton", health: 5, aggro: 10, proficiencies: ["berzerker", "defender"]},
      info: "summons a skeleton minion \n aggro:10"
    },
  },
  {
    name: "arcane barrier",
    properties: {
      types: ["arcane", "light"],
      target: 2,
      aggro: 2,
      shield: 3,
      info: "3 shield to single ally \n aggro:2"
    },
  },
  {
    name: "soul drain",
    properties: {
      types: ["dark", "blood"],
      target: 3,
      aggro: 3,
      health: -3,
      heal: 3,
      info: "3 damage to single enemy \n 3 health to self \n aggro:3"
    },
  },
  {
    name: "phoenix flame",
    properties: {
      types: ["fire", "light"],
      target: 3,
      aggro: 3,
      health: -5,
      info: "5 damage to single enemy \n aggro:3"
    },
  },
  {
    name: "rebirth",
    properties: {
      types: ["fire", "light"],
      target: 0,
      aggro: 0,
      heal: 10,
      info: "revives with 10 health \n aggro:0"
    },
  },
  {
    name: "blazing aura",
    properties: {
      types: ["fire", "arcane"],
      target: 0,
      aggro: 3,
      health: 1,
      strengthen: 1,
      info: "1 heal and 1 strengthen to self \n aggro:3"
    },
  },
  {
    name: "healing flame",
    properties: {
      types: ["fire", "light"],
      target: 2,
      aggro: 2,
      health: 4,
      info: "4 health to single ally \n aggro:2"
    },
  },
  {
    name: "spirit link",
    properties: {
      types: ["psychic", "nature"],
      target: 4,
      aggro: 2,
      health: 2,
      info: "2 health to all allies \n aggro:2"
    },
  },
  {
    name: "healing rain",
    properties: {
      types: ["nature", "light"],
      target: 4,
      aggro: 3,
      health: 3,
      info: "3 health to all allies \n aggro:3"
    },
  },
  {
    name: "totem summon",
    properties: {
      types: ["nature", "arcane"],
      target: 0,
      aggro: 3,
      summon: {amount: 1, type: "totem", health: 10, aggro: 10, proficiencies: ["vengeance", "protection"]},
      info: "summons a totem with 10 health \n aggro:10"
    },
  },
  {
    name: "summon spirit",
    properties: {
      types: ["nature", "arcane"],
      target: 0,
      aggro: 3,
      summon: {amount: 1, type: "spirit", health: 5, aggro: 10, proficiencies: ["hawk", "panther", "wolf", "bear"]},
      info: "summons a spirit animal minion \n aggro:10"
    },
  },
  {
    name: "mind cleanse",
    properties: {
      types: ["psychic", "light"],
      target: 2,
      aggro: 2,
      removeDebuff: 1,
      info: "removes one debuff from ally \n aggro:2"
    },
  },
  {
    name: "frenzy",
    properties: {
      types: ["physical", "blood"],
      target: 3,
      aggro: 3,
      health: -3,
      info: "3 damage to single enemy \n aggro:3"
    },
  },
  {
    name: "blood rage",
    properties: {
      types: ["blood", "dark"],
      target: 0,
      aggro: 4,
      strengthen: 3,
      info: "3 strengthen to self \n aggro:4"
    },
  },
  {
    name: "reckless strike",
    properties: {
      types: ["physical", "blood"],
      target: 3,
      aggro: 4,
      health: -6,
      selfDamage: 2,
      info: "6 damage to single enemy \n 2 damage to self \n aggro:4"
    },
  },
  {
    name: "self-heal",
    properties: {
      types: ["nature", "blood"],
      target: 0,
      aggro: 2,
      health: 4,
      info: "4 health to self \n aggro:2"
    },
  },
];
