import { skills } from "./skills.js";

let maxHP = 100; // Initialize maxHP to 100
let credits = 150000; // Initialize credits to 1000

function createSkillsTable(skills) {
  // Container for HP
  const hpContainer = document.createElement("div");
  hpContainer.classList.add("hp-container");

  // HP Input Field
  const hpLabel = document.createElement("label");
  hpLabel.setAttribute("for", "hpInput");
  hpLabel.textContent = "Hit Points: ";
  const hpInput = document.createElement("input");
  hpInput.type = "number";
  hpInput.id = "hpInput";
  hpInput.value = maxHP; // Set the default value to maxHP

  // Append HP elements to its container
  hpContainer.appendChild(hpLabel);
  hpContainer.appendChild(hpInput);

  // Container for Credits and its elements
  const creditsContainer = document.createElement("div");
  creditsContainer.classList.add("credits-container");

  // Inner container for Credits label and display
  const creditsInfoContainer = document.createElement("div");
  creditsInfoContainer.classList.add("credits-info-container");

  // Credits Label and Display
  const creditsLabel = document.createElement("label");
  creditsLabel.textContent = "Credits: ";
  const creditsDisplay = document.createElement("span");
  creditsDisplay.id = "creditsDisplay";
  creditsDisplay.textContent = credits;

  // Append Credits elements to its container
  creditsInfoContainer.appendChild(creditsLabel);
  creditsInfoContainer.appendChild(creditsDisplay);
  creditsContainer.appendChild(creditsInfoContainer);

  // Credits Input
  const creditsInput = document.createElement("input");
  creditsInput.type = "number";
  creditsInput.id = "creditsInput";
  creditsInput.placeholder = "Amount";
  creditsContainer.appendChild(creditsInput);

  // Buttons container for Credits manipulation
  const creditsBtnContainer = document.createElement("div");
  creditsBtnContainer.classList.add("credits-btn-container");

  // Add and Remove Credits Buttons
  const addCreditsBtn = document.createElement("button");
  addCreditsBtn.textContent = "+";
  addCreditsBtn.onclick = () => {
    credits += parseInt(creditsInput.value || 0);
    creditsDisplay.textContent = credits;
  };

  const removeCreditsBtn = document.createElement("button");
  removeCreditsBtn.textContent = "-";
  removeCreditsBtn.onclick = () => {
    credits -= parseInt(creditsInput.value || 0);
    creditsDisplay.textContent = credits;
  };

  creditsBtnContainer.appendChild(addCreditsBtn);
  creditsBtnContainer.appendChild(removeCreditsBtn);
  creditsContainer.appendChild(creditsBtnContainer);

  // Append Credits elements to its container
  creditsContainer.appendChild(creditsLabel);
  creditsContainer.appendChild(creditsDisplay);
  creditsContainer.appendChild(creditsInput);
  creditsContainer.appendChild(addCreditsBtn);
  creditsContainer.appendChild(removeCreditsBtn);

  // Main controls container
  const controlsContainer = document.createElement("div");
  controlsContainer.classList.add("controls-container");

  // Append HP and Credits containers to the main controls container
  controlsContainer.appendChild(hpContainer);
  controlsContainer.appendChild(creditsContainer);

  document.body.insertBefore(
    controlsContainer,
    document.getElementById("skillsTable")
  );

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");
  const headerRow = document.createElement("tr");

  const bonusTotals = {}; // Object to store total bonuses for each category

  // Create main category headers
  Object.keys(skills).forEach((skillCategory) => {
    const th = document.createElement("th");
    th.textContent = skillCategory;
    headerRow.appendChild(th);

    bonusTotals[skillCategory] = 0; // Initialize bonus total for this category
  });

  thead.appendChild(headerRow);
  table.appendChild(thead);

  // Function to toggle visibility
  function toggleVisibility(row) {
    row.style.display = row.style.display === "none" ? "table-row" : "none";
  }

  // Create subheading row for Traits that spans all columns
  const traitsSubheadingRow = document.createElement("tr");
  const traitsSubheading = document.createElement("th");
  traitsSubheading.textContent = "Traits";
  traitsSubheading.colSpan = Object.keys(skills).length;
  traitsSubheading.classList.add("subheading");
  traitsSubheading.onclick = () => toggleVisibility(traitsRow);
  traitsSubheadingRow.appendChild(traitsSubheading);
  tbody.appendChild(traitsSubheadingRow);

  const traitsRow = document.createElement("tr");
  traitsRow.style.display = "none"; // Initially hidden
  Object.values(skills).forEach((category) => {
    const td = document.createElement("td");
    const traitsList = document.createElement("ul");

    category.traits.forEach((trait) => {
      const li = document.createElement("li");
      li.innerHTML = `<strong>${trait.name}</strong><br>${trait.description}`;
      traitsList.appendChild(li);
    });

    td.appendChild(traitsList);
    traitsRow.appendChild(td);
  });
  tbody.appendChild(traitsRow);

  // Create subheading row for Enhancements that spans all columns
  const enhancementsSubheadingRow = document.createElement("tr");
  const enhancementsSubheading = document.createElement("th");
  enhancementsSubheading.textContent = "Enhancements";
  enhancementsSubheading.colSpan = Object.keys(skills).length;
  enhancementsSubheading.classList.add("subheading");
  enhancementsSubheading.onclick = () => toggleVisibility(enhancementsRow);
  enhancementsSubheadingRow.appendChild(enhancementsSubheading);
  tbody.appendChild(enhancementsSubheadingRow);

  const enhancementsRow = document.createElement("tr");
  enhancementsRow.style.display = "none"; // Initially hidden
  Object.keys(skills).forEach((skillCategory) => {
    const category = skills[skillCategory];
    const td = document.createElement("td");
  
    // Use a data attribute to store the image URL
    if (category.image) {
      td.setAttribute('data-bg', category.image);
    }

    // Set the background image for the category cell
    if (category.image) {
      td.style.backgroundImage = `url(${category.image})`;
      td.style.backgroundSize = "contain";
      td.style.backgroundRepeat = "no-repeat";
      td.style.backgroundPosition = "center";
    }

    const enhancementsList = document.createElement("ul");

    category.enhancements.forEach((enhancement) => {
      const li = document.createElement("li");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      const label = document.createElement("label");
      label.innerHTML = `<strong>${enhancement.name}</strong>: ${enhancement.credits}sc (Bonus: ${enhancement.bonus})<br><strong>Description</strong>: ${enhancement.description}`;

      // Event listener for checkbox
      checkbox.addEventListener("change", function () {
        if (this.checked) {
          credits -= enhancement.credits; // Subtract credits for checked enhancement
          if (skillCategory === "Vitality") {
            maxHP += enhancement.bonus; // Update maxHP for Vitality enhancements
            hpInput.value = maxHP;
          }
        } else {
          credits += enhancement.credits; // Add credits back for unchecked enhancement
          if (skillCategory === "Vitality") {
            maxHP -= enhancement.bonus; // Update maxHP for unchecked Vitality enhancement
            hpInput.value = maxHP;
          }
        }
        creditsDisplay.textContent = credits; // Update credits display
      });

      li.appendChild(checkbox);
      li.appendChild(label);
      enhancementsList.appendChild(li);
    });

    td.appendChild(enhancementsList);
    enhancementsRow.appendChild(td);
  });
  tbody.appendChild(enhancementsRow);


  table.appendChild(tbody);
  document.getElementById("skillsTable").appendChild(table);
}

createSkillsTable(skills);
