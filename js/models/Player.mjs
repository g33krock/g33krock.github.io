// Player.mjs
import { EntityManager } from "../managers/EntityManager.mjs";

export const roleProficiencies = {
  Warrior: [
    { name: "Defender", shieldSelf: 5, damageModifier: -1 },
    { name: "Berzerker", shieldSelf: -1, damageModifier: 5 },
    { name: "Balance", shieldSelf: 2, damageModifier: 2 },
  ],
  Cleric: [
    { name: "Holy", healModifier: 3, damageModifier: -1 },
    { name: "Shadow", isShadow: true },
    { name: "Blessing", shield: 3, strengthen: 3 },
  ],
  Rogue: [
    { name: "Poisonous", additionalCounters: 2 },
    { name: "Stealth", aggroModifier: -2 },
    { name: "Deadly", damageModifier: 2 },
  ],
  Mage: [
    { name: "Flame Shield", isFlameShield: true },
    { name: "Frost Shield", isFrostShield: true },
    { name: "Arcane Shield", isArcaneShield: true },
  ],
  Paladin: [
    { name: "Vengeance", strengthenAll: 2 },
    { name: "Protection", shieldAll: 2 },
    { name: "Balance", shieldAll: 1, strengthenAll: 1 },
  ],
  Druid: [
    { name: "Bear", shield: 5, damageModifier: -1 },
    { name: "Panther", aggroModifier: -1, damageModifier: 3 },
    { name: "Life", healModifier: 3, strengthen: 2 },
  ],
  DeathKnight: [
    { name: "Frozen", isFrostShield: true },
    { name: "Torment", isAggroLife: true },
    { name: "Plague", additionalCounters: 2 },
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

