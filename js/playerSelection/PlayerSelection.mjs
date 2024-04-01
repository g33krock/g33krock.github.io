import { roleProficiencies } from "../models/Player.mjs";

document.addEventListener("DOMContentLoaded", () => {
  const partySizeSelector = document.getElementById("party-size");
  const roleSelectionColumn = document.getElementById("role-selection-column");
  const proficiencySelectionColumn = document.getElementById("proficiency-selection-column");
  const form = document.getElementById("party-selection-form");

  const playerRoles = [
    "Warrior", "Cleric", "Rogue", "Mage", "Paladin", "Druid", "DeathKnight",
  ];

  function generateRoleAndProficiencySelections(partySize) {
    roleSelectionColumn.innerHTML = "";
    proficiencySelectionColumn.innerHTML = "";

    for (let i = 1; i <= partySize; i++) {
      const roleLabel = document.createElement("label");
      roleLabel.textContent = `Player ${i} Role: `;
      const roleSelect = document.createElement("select");
      roleSelect.name = `player-role-${i}`;

      roleSelect.addEventListener("change", (e) => {
        const selectedRole = e.target.value;
        const proficiencies = roleProficiencies[selectedRole];
        const profSelect = document.querySelector(`#player-${i}-proficiencies`);
        profSelect.innerHTML = "";
        proficiencies.forEach((prof) => {
          const option = document.createElement("option");
          option.value = prof.name;
          option.textContent = prof.name;
          profSelect.appendChild(option);
        });
        profSelect.disabled = false;
      });

      playerRoles.forEach((role) => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = role;
        roleSelect.appendChild(option);
      });

      roleLabel.appendChild(roleSelect);
      roleSelectionColumn.appendChild(roleLabel);

      const profLabel = document.createElement("label");
      profLabel.textContent = `Player ${i} Proficiency: `;

      const profSelect = document.createElement("select");
      profSelect.id = `player-${i}-proficiencies`;
      profSelect.name = `player-proficiency-${i}`;
      profSelect.disabled = true;
      proficiencySelectionColumn.appendChild(profSelect);

      profLabel.appendChild(profSelect);
      proficiencySelectionColumn.appendChild(profLabel);
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
