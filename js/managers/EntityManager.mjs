export class EntityManager {
  constructor(options = {}) {
    this.health = options.health || 20;
    this.startingHealth = this.health;
    this.aggro = options.aggro || 0;
    this.monsterSpecificAggro = {};
    this.shield = options.shield || 0;
    this.strengthen = options.strengthen || 0;
    this.effects = [];
    this.faction = options.faction;
    this.alive = true;
    this.index;
  }

  addEffect(newEffect) {
    let existingEffect = this.effects.find(
      (effect) => effect.type === newEffect.type
    );

    if (existingEffect) {
      existingEffect.counters += newEffect.counters;
    } else {
      this.effects.push(newEffect);
    }
  }

  updateEffects(target) {
    return new Promise((resolve) => {
      this.effects.forEach((effect) => {
        this.applyEffect(effect, target);
        effect.counters -= 1;
      });
      this.effects = this.effects.filter((effect) => effect.counters > 0);
      resolve();
    });
  }

  applyEffect(effect, target) {
    switch (effect.type) {
      case "hot":
        this.modifyHealth(effect.value, target);
        break;
      case "stot":
        this.modifyStrengthen(effect.value);
        break;
      case "shot":
        this.modifyShield(effect.value);
        break;
    }
  }

  modifyHealth(amount, entity) {
    console.log(`Shield: ${this.shield}`);
    console.log(`Amount: ${amount}`);

    if (amount > 0){
      this.health += amount
    }
    else {
      if (this.shield < 0){
        this.health += amount + this.shield
      }
      else {
        if (Math.abs(this.shield) > Math.abs(amount)){
          this.health += 0
        }
        else {
          this.health += amount
        }
      }
    }

    if (this.health <= 0) {
      this.health = 0;
      this.alive = false;
      this.markAsDead(entity);
    }
  }

  markAsDead(entity) {
    let container;
    if (entity.faction === "player") {
      container = document.querySelector(
        `[data-playerindex="${entity.index}"]`
      );
    } else {
      container = document.querySelector(
        `[data-monster-index="${entity.index}"]`
      );
    }
    container.classList.add("dead");
    container.style.backgroundImage = "url('../../images/Skull.png')";
  }

  modifyAggro(amount) {
    this.aggro += amount;
    this.aggro = Math.min(this.aggro, 20); 
    this.aggro = Math.max(this.aggro, 0); 
  }

  modifyMonsterSpecificAggro(monsterId, amount) {
    if (!this.monsterSpecificAggro[monsterId]) {
      this.monsterSpecificAggro[monsterId] = 0;
    }
    this.monsterSpecificAggro[monsterId] += amount;
    this.monsterSpecificAggro[monsterId] = Math.min(
      this.monsterSpecificAggro[monsterId],
      20
    );
    this.monsterSpecificAggro[monsterId] = Math.max(
      this.monsterSpecificAggro[monsterId],
      0
    );
  }

  modifyShield(amount) {
    this.shield += amount;
  }

  modifyStrengthen(amount) {
    this.strengthen += amount;
  }
}
