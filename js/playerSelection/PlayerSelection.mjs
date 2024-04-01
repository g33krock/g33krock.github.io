import { roleProficiencies } from "../models/Player.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const partySizeSelector = document.getElementById("party-size");
  const roleSelectionColumn = document.getElementById("role-selection-column");
  const proficiencySelectionColumn = document.getElementById("proficiency-selection-column");
  const form = document.getElementById("party-selection-form");
  const startGameButton = document.querySelector("button[type='submit']");

  startGameButton.disabled = true; // Disable the start game button by default

  const playerRoles = [
    "Warrior", "Cleric", "Rogue", "Mage", "Paladin", "Druid", "DeathKnight",
  ];

  function updateStartButtonState() {
      let allSelected = true;
      document.querySelectorAll('select[name^="player-role-"]').forEach((select) => {
          if(select.value === "") allSelected = false;
      });
      document.querySelectorAll('select[name^="player-proficiency-"]').forEach((select) => {
          if(select.value === "") allSelected = false;
      });
      startGameButton.disabled = !allSelected;
  }



  function generateRoleAndProficiencySelections(partySize) {
    roleSelectionColumn.innerHTML = "";
    proficiencySelectionColumn.innerHTML = "";

    for (let i = 1; i <= partySize; i++) {
      const roleLabel = document.createElement("label");
      roleLabel.classList.add('fire');
      roleLabel.textContent = `Player ${i} Role: `;
      const roleSelect = document.createElement("select");
      roleSelect.classList.add("select-style");
      roleSelect.classList.add("fire-option");
      roleSelect.name = `player-role-${i}`;
      roleSelect.onchange = updateStartButtonState;

      roleSelect.addEventListener("change", (e) => {
        const selectedRole = e.target.value;
        const proficiencies = roleProficiencies[selectedRole];
        const profSelect = document.querySelector(`#player-${i}-proficiencies`);
        profSelect.classList.add("select-style");
        profSelect.classList.add("fire-option");
        profSelect.innerHTML = "";
        proficiencies.forEach((prof) => {
          const option = document.createElement("option");
          option.value = prof.name;
          option.textContent = prof.name;
          profSelect.appendChild(option);
        });
        profSelect.disabled = false;
      });

      const defaultRoleOption = document.createElement("option");
      defaultRoleOption.textContent = "Select a Role";
      defaultRoleOption.disabled = true;
      defaultRoleOption.selected = true;
      roleSelect.appendChild(defaultRoleOption);

      const defaultProfOption = document.createElement("option");
      defaultProfOption.textContent = "Select a Proficiency";
      defaultProfOption.disabled = true;
      defaultProfOption.selected = true;

      playerRoles.forEach((role) => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = role;
        roleSelect.appendChild(option);
      });

      roleLabel.appendChild(roleSelect);
      roleSelectionColumn.appendChild(roleLabel);

      const profLabel = document.createElement("label");
      profLabel.classList.add('fire');
      profLabel.textContent = `Player ${i} Proficiency: `;

      const profSelect = document.createElement("select");
      profSelect.id = `player-${i}-proficiencies`;
      profSelect.name = `player-proficiency-${i}`;
      profSelect.disabled = true;
      profSelect.appendChild(defaultProfOption);

      profLabel.appendChild(profSelect);
      proficiencySelectionColumn.appendChild(profLabel);
      proficiencySelectionColumn.appendChild(profSelect);

      
      profSelect.onchange = updateStartButtonState;
    }
  }

  partySizeSelector.addEventListener("change", (e) => {
    const partySize = parseInt(e.target.value, 10);
    generateRoleAndProficiencySelections(partySize);
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const selectedRoles = Array.from(
      form.querySelectorAll('select[name^="player-role-"]')
    ).map((select) => select.value);
    const selectedProficiencies = Array.from(
      form.querySelectorAll('select[name^="player-proficiency-"]')
    ).map((select) => select.value);

    const playerConfigurations = selectedRoles.map((role, index) => ({
      role: role,
      proficiency: selectedProficiencies[index],
    }));

    localStorage.setItem(
      "playerConfigurations",
      JSON.stringify(playerConfigurations)
    );

    localStorage.setItem("selectedRoles", JSON.stringify(selectedRoles));

    window.location.href = "../../gameplay.html";
  });

  generateRoleAndProficiencySelections(parseInt(partySizeSelector.value, 10));
});
