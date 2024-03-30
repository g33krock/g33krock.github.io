export class UIManager {
    constructor() {}
  
    clearUI() {
     
    }
  
    setupUI(playerDecks, playerRoles, monsters) {
      this.clearUI();
      playerDecks.forEach((deck, index) => {
        const playerHandElement = document.querySelector(
          `#player${index + 1}-hand`
        );
        if (playerHandElement) {
          const playerRole = playerRoles[index + 1];
          this.renderPlayerHand(deck, playerHandElement, playerRole);
        } else {
          console.warn(`Player hand element for index ${index} not found.`);
        }
      });
    }
  
    renderPlayerHand(playerDeck, playerHandElement, playerRole) {
      playerHandElement.innerHTML = "";
      playerDeck.deck.forEach((card) => {
        const cardElement = this.renderCard(card);
        playerHandElement.appendChild(cardElement);
      });
    }
  
    renderCard(card) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
  
      const nameElement = document.createElement("h3");
      nameElement.textContent = card.name;
      cardElement.appendChild(nameElement);
      cardElement.style.backgroundColor = "black";
      cardElement.style.color = "white";

      const imageElement = document.createElement("img");
      imageElement.src = `../../images/${card.name}.png`; 
      imageElement.alt = card.name;
      imageElement.style.width = "75px"; 
      imageElement.style.height = "auto"; 
      imageElement.style.display = "block";
      cardElement.appendChild(imageElement);

      return cardElement;
    }
  
    updateDiscardPileUI(drawnCards) {
      const discardPile = document.getElementById("discard-pile");
      discardPile.innerHTML = ""; 
      drawnCards.forEach((card) => {
        const cardElement = this.renderCard(card);
        discardPile.appendChild(cardElement);
      });
    }
  
    setupTargetSelectionHandlers() {
      this.setupPlayerTargetHandlers();
      this.setupMonsterTargetHandlers();
    }
  
    setupPlayerTargetHandlers() {
      document.querySelectorAll(".player-info").forEach((element, index) => {
        element.addEventListener("click", () => {
          this.selectTarget("player", index);
        });
      });
    }
  
    setupMonsterTargetHandlers() {
      document.querySelectorAll(".monster").forEach((element, index) => {
        element.addEventListener("click", () => {
          this.selectTarget("monster", index);
        });
      });
    }
  
    selectTarget(type, index) {

    }
  }
