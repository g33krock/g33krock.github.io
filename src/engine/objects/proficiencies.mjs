export let proficiencies = {
    'warrior': [
      { name: "Defender", shieldSelf: 5, damageModifier: -1, info:"+5 shield to self each round, -1 to hit", locked: true },
      { name: "Berzerker", shieldSelf: -1, damageModifier: 5, info:"-1 shield to self each round, +5 to hit", locked: true },
      { name: "Balance", shieldSelf: 2, damageModifier: 2, info:"+2 shield to self each round, +2 to hit", locked: false },
    ],
    'cleric': [
      { name: "Holy", healModifier: 3, damageModifier: -1, info:"+3 to heals, -1 to hit", locked: false },
      { name: "Shadow", isShadow: true, info:"all direct heals become hits", locked: true },
      { name: "Blessing", shield: 3, strengthen: 3, info:"+3 shield toself or others, +3 strengthen to self or others", locked: true },
    ],
    'rogue': [
      { name: "Poisonous", additionalCounters: 2, info:"when applying counters, get an extra 2 counters", locked: true },
      { name: "Stealth", aggroModifier: -2, info:"-2 aggro each round", locked: false },
      { name: "Deadly", damageModifier: 4, info:"+4 to hit", locked: true },
    ],
    'mage': [
      { name: "Flame Shield", isFlameShield: true, info:"when you are hit, deal 3 direct damage to attacker immediately and 2 damage next round", locked: false },
      { name: "Frost Shield", isFrostShield: true, info:"when you are hit, give the attacker -3 strength immediately and -3 strength next round", locked: true },
      { name: "Arcane Shield", isArcaneShield: true, info:"when you are hit, give the attacker - 2 shield immediately and -2 shield next round", locked: true },
    ],
    'paladin': [
      { name: "Vengeance", strengthenAll: 2, info:"all players get +2 strength while active", locked: true },
      { name: "Protection", shieldAll: 2, info:"all players get +2 shield while active", locked: true },
      { name: "Balance", shieldAll: 1, strengthenAll: 1, info:"all players get +1 strength and +1 shield while active", locked: false },
    ],
    'druid': [
      { name: "Bear", shieldSelf: 3, damageModifier: 1, info:"+3 shield to self each round, +1 to hit", locked: false },
      { name: "Panther", aggroModifier: -1, damageModifier: 3, info:"-1 aggro each round, +3 to hit", locked: true },
      { name: "Life", healModifier: 3, strengthen: 2, info:"+3 to heals, +2 to strengthen self or others", locked: true },
    ],
    'death knight': [
      { name: "Frozen", isFrostShield: true, info:"when you are hit, give the attacker -3 strength immediately and -3 strength next round", locked: false },
      { name: "Torment", isAggroLife: true, info:"start encounter with 10 aggro, attacks will affect your aggro instead of health, when aggro is 0 you are dead", locked: true },
      { name: "Plague", additionalCounters: 3, info:"when applying counters, get an extra 3 counters", locked: true },
    ],
  };