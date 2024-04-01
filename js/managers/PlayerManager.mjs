import { Player } from "../models/Player.mjs"
import { playerRoles } from "../config/GameConfig.mjs"

export class PlayerManager {
    constructor() {
        this.players = playerRoles.map(role => new Player({ role, faction: 'player' }));
    }

    addPlayer(options) {
      const player = new Player(options);
      this.players.push(player);
      if(player.role === "Illusion"){
        this.updatePlayerInfoBoxes
      }
    }

    addPlayerWithIndex(playerEntity) {
      this.players.push(playerEntity);
  }

    getPlayer(index) {
        return this.players[index];
    }

    async updateAllPlayers() {
      for (const player of this.players) {
        await player.updateEffects(player);
      }
    }

    updatePlayerInfoBoxes() {
        this.players.forEach((player, index) => {
          const playerInfoDiv = document.getElementById(`player${index + 1}-info`);
          if (playerInfoDiv) {
            let playerInfoHtml = `
                <p>Health: ${player.health}</p>
                <p>Aggro: ${player.aggro}</p>
                <p>Shield: ${player.shield}</p>
                <p>Strengthen: ${player.strengthen}</p>
              `;
      
            if (player.effects.length > 0) {
              playerInfoHtml += "<div class='effects-container'>";
      
              const effectsByType = player.effects.reduce((acc, effect) => {
                if (!acc[effect.type]) {
                  acc[effect.type] = { effects: [], colorClass: "" };
                }
                acc[effect.type].effects.push(effect);
      
                let colorClass = "";
                if (effect.type === "hot") {
                  colorClass = effect.value > 0 ? "green" : "red";
                } else if (effect.type === "stot") {
                  colorClass = effect.value > 0 ? "blue" : "yellow";
                } else if (effect.type === "shot") {
                  colorClass = effect.value > 0 ? "purple" : "orange";
                } else if (effect.type === "reflect") {
                  colorClass = "grey";
                } else if (effect.type === "explosivePoisonTrap") {
                  colorClass = "pink";
                } else if (effect.type === "paralyzingTrap") {
                  colorClass = "brown";
                }
                acc[effect.type].colorClass = colorClass;
      
                return acc;
              }, {});
      
              for (const effectType of Object.keys(effectsByType)) {
                const { effects, colorClass } = effectsByType[effectType];
                playerInfoHtml += `<div class='effect-group'>`;
      
                effects.forEach(effect => {
                  let circlesHtml = "";
                  for (let i = 0; i < effect.counters; i++) {
                    circlesHtml += `<span class="effect-circle ${colorClass}">${effect.value}</span>`;
                  }
                  playerInfoHtml += circlesHtml;
                });
      
                playerInfoHtml += "</div>"; 
              }
      
              playerInfoHtml += "</div>"; 
            }
      
            playerInfoDiv.innerHTML = playerInfoHtml;
          }
        });
      }

      async updateAllEffects() {
        for (const player of this.players) {
          await player.updateEffects(player);
        }
      }
    
      resetStrength() {
        this.players.forEach((player) => {
          player.strengthen = 0;
        });
      }

      resetShield() {
        this.players.forEach((player) => {
          player.shield = 0;
        });
      }
}
