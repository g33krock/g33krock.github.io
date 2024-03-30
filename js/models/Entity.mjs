export class Entity {
  constructor(options = {}) {
    this.health = options.health || 20;
    this.aggro = options.aggro || 0;
    this.shield = options.shield || 0;
    this.strengthen = options.strengthen || 0;
    this.effects = [];
    this.faction = options.faction; 
    this.alive = true;
  }

  addEffect(effect) {
    this.effects.push(effect);
  }

  updateEffects() {
    this.effects.forEach((effect) => {
      this.applyEffect(effect);
      effect.counters -= 1;
    });
    this.effects = this.effects.filter(effect => effect.counters > 0);
  }

  applyEffect(effect) {
    switch (effect.type) {
      case "hot":
        this.modifyHealth(effect.value);
        break;
      case "stot":
        this.modifyStrengthen(effect.value);
        break;
      case "shot":
        this.modifyShield(effect.value);
        break;
    }
  }

  modifyHealth(amount) {
    console.log(`Shield: ${this.shield}`)
    console.log(`Amount: ${amount}`)
      if (this.shield !== 0 && amount < 0) {
        if (amount + this.shield > 0) {
          this.health += 0;
        } else {
          this.health += amount - this.shield;
        }
      } else if (this.shield !== 0 && amount > 0) {
        this.health += amount + this.shield;
      } else {
        this.health += amount;
      }
    }

  modifyAggro(amount) {
    this.aggro += amount;
  }

  modifyShield(amount) {
    this.shield += amount;
  }

  modifyStrengthen(amount) {
    this.strengthen += amount;
  }
}
