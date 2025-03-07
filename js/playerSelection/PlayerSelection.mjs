import { getProficiencies, getEntities, resetGame } from "./src/engine/logic/state/stateManager.mjs"; // Updated import path

function updatePartySizeOptions() {
    const partySizeSelector = document.getElementById("party-size");
    const playerRoles = getEntities().filter(entity => entity.faction === 'hero' && !entity.locked).map(entity => entity.role);

    partySizeSelector.innerHTML = ''; // Clear existing options

    const defaultOption = document.createElement("option");
    defaultOption.value = "0";
    defaultOption.textContent = "Select Your Party Size";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    partySizeSelector.appendChild(defaultOption);

    const maxOptions = Math.min(playerRoles.length, 5);
    for (let i = 1; i <= maxOptions; i++) {
        const option = document.createElement("option");
        option.value = i.toString();
        option.textContent = i.toString();
        partySizeSelector.appendChild(option);
    }

    if (playerRoles.length > 0) {
        partySizeSelector.value = "1";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updatePartySizeOptions();
    const roleProficiencies = getProficiencies();
    const entities = getEntities();
    const partySizeSelector = document.getElementById("party-size");
    const roleSelectionColumn = document.getElementById("role-selection-column");
    const proficiencySelectionColumn = document.getElementById("proficiency-selection-column");
    const form = document.getElementById("party-selection-form");
    const startGameButton = document.querySelector("button[type='submit']");
    const resetButton = document.getElementById("reset-game-button");

    if (resetButton) {
        resetButton.addEventListener("click", resetPaperDungeon);
    }

    startGameButton.disabled = true;

    function updateStartButtonState() {
        let allSelected = true;
        document.querySelectorAll('select[name^="player-role-"]').forEach(select => {
            if (select.value === "") allSelected = false;
        });
        document.querySelectorAll('select[name^="player-proficiency-"]').forEach(select => {
            if (select.value === "") allSelected = false;
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
            roleSelect.classList.add("select-style", "fire-option");
            roleSelect.name = `player-role-${i}`;
            roleSelect.onchange = updateStartButtonState;

            roleSelect.addEventListener("change", (e) => {
                const selectedRole = e.target.value;
                const proficiencies = roleProficiencies[selectedRole];
                const profSelect = document.querySelector(`#player-${i}-proficiencies`);
                profSelect.classList.add("select-style", "fire-option");
                profSelect.innerHTML = "";
                proficiencies.filter(prof => !prof.locked).forEach((prof) => {
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
            profSelect.appendChild(defaultRoleOption.cloneNode(true));

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
        ).map(select => select.value);
        const selectedProficiencies = Array.from(
            form.querySelectorAll('select[name^="player-proficiency-"]')
        ).map(select => select.value);

        const playerConfigurations = selectedRoles.map((role, index) => ({
            id: `entity-${index}`,
            role: role,
            proficiency: selectedProficiencies[index],
        }));

        localStorage.setItem("playerConfigurations", JSON.stringify(playerConfigurations));
        localStorage.setItem("selectedRoles", JSON.stringify(selectedRoles));

        // Corrected game start navigation
        window.location.href = "./gameplay.html"; 
    });

    async function resetPaperDungeon() {
        localStorage.removeItem("playerConfigurations");
        localStorage.removeItem("selectedRoles");
        await resetGame();
        document.getElementById("party-selection-form").reset();
        updatePartySizeOptions();
        roleSelectionColumn.innerHTML = '';
        proficiencySelectionColumn.innerHTML = '';
        generateRoleAndProficiencySelections(parseInt(partySizeSelector.value, 10));
    }

    generateRoleAndProficiencySelections(parseInt(partySizeSelector.value, 10));
});
