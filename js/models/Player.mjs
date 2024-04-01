// Player.mjs
import { EntityManager } from "../managers/EntityManager.mjs";

export const roleProficiencies = {
  Warrior: [
    { name: "Defender", shieldSelf: 5, damageModifier: -1, info:"+5 shield to self each round, -1 to hit" },
    { name: "Berzerker", shieldSelf: -1, damageModifier: 5, info:"-1 shield to self each round, +5 to hit" },
    { name: "Balance", shieldSelf: 2, damageModifier: 2, info:"+2 shield to self each round, +2 to hit" },
  ],
  Cleric: [
    { name: "Holy", healModifier: 3, damageModifier: -1, info:"+3 to heals, -1 to hit" },
    { name: "Shadow", isShadow: true, info:"all direct heals become hits" },
    { name: "Blessing", shield: 3, strengthen: 3, info:"+3 shield toself or others, +3 strengthen to self or others" },
  ],
  Rogue: [
    { name: "Poisonous", additionalCounters: 2, info:"when applying counters, get an extra 2 counters" },
    { name: "Stealth", aggroModifier: -2, info:"-2 aggro each round" },
    { name: "Deadly", damageModifier: 4, info:"+4 to hit" },
  ],
  Mage: [
    { name: "Flame Shield", isFlameShield: true, info:"when you are hit, deal 3 direct damage to attacker immediately and 2 damage next round" },
    { name: "Frost Shield", isFrostShield: true, info:"when you are hit, give the attacker -3 strength immediately and -3 strength next round" },
    { name: "Arcane Shield", isArcaneShield: true, info:"when you are hit, give the attacker - 2 shield immediately and -2 shield next round" },
  ],
  Paladin: [
    { name: "Vengeance", strengthenAll: 2, info:"all players get +2 strength while active" },
    { name: "Protection", shieldAll: 2, info:"all players get +2 shield while active" },
    { name: "Balance", shieldAll: 1, strengthenAll: 1, info:"all players get +1 strength and +1 shield while active" },
  ],
  Druid: [
    { name: "Bear", shield: 5, damageModifier: -1, info:"+5 shield to self each round, -1 to hit" },
    { name: "Panther", aggroModifier: -1, damageModifier: 3, info:"-1 aggro each round, +3 to hit" },
    { name: "Life", healModifier: 3, strengthen: 2, info:"+3 to heals, +2 to strengthen self or others" },
  ],
  DeathKnight: [
    { name: "Frozen", isFrostShield: true, info:"when you are hit, give the attacker -3 strength immediately and -3 strength next round" },
    { name: "Torment", isAggroLife: true, info:"start encounter with 10 aggro, attacks will affect your aggro instead of health, when aggro is 0 you are dead" },
    { name: "Plague", additionalCounters: 2, info:"when applying counters, get an extra 2 counters" },
  ],
};

export class Player extends EntityManager {
  constructor(options = {}) {
    super(options);
    this.role = options.role.role || "Onion Knight";
    this.proficiency = this.assignProficiency(this.role, options.role.proficiency);
    this.flameShield = false;
    this.frostShield = false;
    this.arcaneShield = false;
    this.aggroLife = false;
  }

  assignProficiency(role, proficiencyName) {
    if (role !== "Illusion" && roleProficiencies[role]) {
      const proficiency = roleProficiencies[role].find(p => p.name === proficiencyName);
      return proficiency || null; 
    }
    return null; 
  }

  applyRoundStartProficiencyEffects() {
    if (this.proficiency) {
      if (this.proficiency.shieldSelf) {
          this.shield += this.proficiency.shieldSelf; 
      }
  
      if (this.proficiency.strengthenSelf) {
          this.strengthen += this.proficiency.strengthenSelf; 
      }
      if (this.proficiency.isFlameShield){
        this.flameShield = true;
      }
      if (this.proficiency.isFrostShield){
        this.frostShield = true;
      }
      if (this.proficiency.isArcaneShield){
        this.arcaneShield = true;
      }
      if (this.proficiency.isAggroLife){
        this.aggroLife= true;
      }
    }
  }
}

