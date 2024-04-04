export class CardModel {
    constructor(name, properties) {
      this.name = name;
      this.entity = properties.entity ? [...properties.entity] : [0];
      this.target = properties.target;
      this.aggro = properties.aggro;
      this.health = properties.health || 0;
      this.hot = properties.hot || 0;
      this.shield = properties.shield || 0;
      this.shot = properties.shot || 0;
      this.strengthen = properties.strengthen || 0;
      this.stot = properties.stot || 0;
      this.reflect = properties.reflect || 0;
      this.counter = properties.counter || 0;
      this.interrupt = properties.interrupt || 0;
      this.explosivePoisonTrap = properties.explosivePoisonTrap || 0;
      this.paralyzingTrap = properties.paralyzingTrap || 0;
    }
  }
