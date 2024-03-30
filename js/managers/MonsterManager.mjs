import { Monster } from "../models/Monster.mjs";

export class MonsterManager {
  constructor(monstersData = []) {
    this.monsterPool = monstersData.map((data) => new Monster(data));
    this.monsters = [];
    this.partySize = JSON.parse(localStorage.getItem("selectedRoles")).length;
  }

  populateMonsters() {
    this.monsters = [];
    let totalPower = this.partySize * 2;

    while (totalPower > 0 && this.monsterPool.length > 0) {
      let randomIndex = Math.floor(Math.random() * this.monsterPool.length);
      let selectedMonster = this.monsterPool[randomIndex];

      if (selectedMonster.power <= totalPower) {
        this.monsters.push(new Monster(selectedMonster));
        totalPower -= selectedMonster.power;
      } else {
        this.monsterPool.splice(randomIndex, 1);
      }
    }

    if (this.monsters.length === 0) {
      console.log("No monsters generated, trying again...");
      this.populateMonsters();
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  executeRandomAbilities = async (players) => {
    for (const monster of this.monsters) {
      if (monster.alive) {
        const monsterContainer = document.querySelector(`.monster[data-monster-index="${monster.index}"]`);

        if (monsterContainer) {
          monsterContainer.classList.add("monster-action-animation");

          await new Promise(resolve => setTimeout(resolve, 500));

          monsterContainer.classList.remove("monster-action-animation");

          await new Promise(resolve => setTimeout(resolve, 500));
        }
        await monster.executeRandomAbility(players, monster);

        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
};

  getMonster(index) {
    return this.monsters[index];
  }

  async updateAllEffects() {
    for (const monster of this.monsters) {
      await monster.updateEffects(monster);
    }
  }

  resetStrength() {
    this.monsters.forEach((monster) => {
      monster.strengthen = 0;
    });
  }

  resetShield() {
    this.monsters.forEach((monster) => {
      monster.shield = 0;
    });
  }

  renderMonsters() {
    const monstersRow = document.getElementById("monsters-row");
    monstersRow.innerHTML = "";
    
    this.monsters.forEach((monster, index) => {
      monster.index = index;
      const monsterDiv = document.createElement("div");
      monsterDiv.classList.add("monster");
      monsterDiv.setAttribute("data-monster-index", index);
      monsterDiv.setAttribute("id", `${monster.monsterType.toLowerCase().replace(/\s+/g, "-")}-${index}`);
    
      const monsterImage = document.createElement("img");
      monsterImage.src = `../../images/${monster.monsterType}.png`;
      monsterImage.alt = monster.monsterType;
      monsterImage.classList.add("monster-image");
    
      const infoContainer = document.createElement("div");
      infoContainer.classList.add("info-container");
  
      const statsContainer = document.createElement("div");
      statsContainer.classList.add("stats-container");
  
      const nameSpan = document.createElement("span");
      nameSpan.classList.add("monster-name");
      nameSpan.textContent = monster.monsterType;
      const healthSpan = document.createElement("span");
      healthSpan.classList.add("monster-health");
      healthSpan.textContent = `HP: ${monster.health}`;
      statsContainer.appendChild(nameSpan);
      statsContainer.appendChild(document.createElement("br")); 
      statsContainer.appendChild(healthSpan);
  
      const effectsContainer = document.createElement("div");
      effectsContainer.classList.add("effects-container");
  
      infoContainer.appendChild(statsContainer);
      infoContainer.appendChild(effectsContainer);
  
      monsterDiv.appendChild(monsterImage);
      monsterDiv.appendChild(infoContainer);
    
      monstersRow.appendChild(monsterDiv);
    });
  }

  

  selectTarget(players) {
    let highestAggro = 0,
      targetIndex = 0;
    players.forEach((player, index) => {
      if (player.aggro > highestAggro) {
        highestAggro = player.aggro;
        targetIndex = index;
      }
    });
    return targetIndex;
  }

  updateMonsterInfoBoxes() {
    this.monsters.forEach((monster, index) => {
      const monsterDiv = document.getElementById(`${monster.monsterType.toLowerCase().replace(/\s+/g, "-")}-${index}`);
      const statsContainer = monsterDiv.querySelector(".stats-container");
      
      if (!monsterDiv) return;
  
      let healthSpan = monsterDiv.querySelector(".monster-health");
      if (!healthSpan) {
        healthSpan = document.createElement("span");
        healthSpan.classList.add("monster-health");
        statsContainer.appendChild(healthSpan);
      }
      healthSpan.textContent = `HP: ${monster.health}`;
  
      let shieldSpan = monsterDiv.querySelector(".monster-shield");
      if (!shieldSpan) {
        shieldSpan = document.createElement("span");
        shieldSpan.classList.add("monster-shield");
        statsContainer.appendChild(document.createElement("br")); 
        statsContainer.appendChild(shieldSpan);
      }
      shieldSpan.textContent = `Shield: ${monster.shield}`;
  
      let strengthenSpan = monsterDiv.querySelector(".monster-strengthen");
      if (!strengthenSpan) {
        strengthenSpan = document.createElement("span");
        strengthenSpan.classList.add("monster-strengthen");
        statsContainer.appendChild(document.createElement("br")); 
        statsContainer.appendChild(strengthenSpan);
      }
      strengthenSpan.textContent = `Strengthen: ${monster.strengthen}`;
  
      let effectsContainer = monsterDiv.querySelector('.effects-container');
      if (effectsContainer) effectsContainer.remove();
      
      effectsContainer = document.createElement("div");
      effectsContainer.classList.add('effects-container');
      monsterDiv.appendChild(effectsContainer);
  
      const effectsByType = monster.effects.reduce((acc, effect) => {
        if (!acc[effect.type]) {
          acc[effect.type] = { effects: [], colorClass: "" };
        }
        acc[effect.type].effects.push(effect);
  
        let colorClass = "";
        switch (effect.type) {
            case "hot":
              colorClass = effect.value > 0 ? "green" : "red";
              break;
            case "stot":
              colorClass = effect.value > 0 ? "blue" : "yellow";
              break;
            case "shot":
              colorClass = effect.value > 0 ? "purple" : "orange";
              break;
            case "reflect":
              colorClass = effect.value > 0 ? "grey" : "brown";
              break;
        }
        acc[effect.type].colorClass = colorClass;
  
        return acc;
      }, {});
  
      Object.keys(effectsByType).forEach(effectType => {
        const effectGroup = document.createElement("div");
        effectGroup.classList.add('effect-group');
    
        const { effects, colorClass } = effectsByType[effectType];
        effects.forEach(effect => {
            for (let i = 0; i < effect.counters; i++) {
                const effectCircle = document.createElement("span");
                effectCircle.classList.add("effect-circle", colorClass);
                effectCircle.textContent = effect.value; 
                effectGroup.appendChild(effectCircle);
            }
        });
    
        effectsContainer.appendChild(effectGroup);
    });
    });
  }
     
}

