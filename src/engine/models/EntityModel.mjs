export class EntityModel {
    constructor(options = {}) {
      this.health = options.health || 0;
      this.aggro = options.aggro || 0;
      this.monsterSpecificAggro = {};
      this.shield = options.shield || 0;
      this.strengthen = options.strengthen || 0;
      this.effects = [];
      this.faction = options.faction; 
      this.alive = true;
      this.role = options.role || "Blob";
      this.proficiency = options.proficiency;
      this.flameShield = false;
      this.frostShield = false;
      this.arcaneShield = false;
      this.aggroLife = false;
      this.power = options.power;
      this.deck = options.deck || [];
    }
}
