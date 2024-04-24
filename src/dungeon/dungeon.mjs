import { instance } from "./dungeonInstances.mjs";

document.addEventListener('DOMContentLoaded', function() {
    if (localStorage.getItem('dungeonState')) {
        restoreDungeon();
    } else {
        generateDungeon();
    }
    document.addEventListener('keydown', movePlayer);
    scrollToBottom(); // Scroll to the player's position on load
});

function generateDungeon() {
    const dungeonElement = document.getElementById('dungeon');
    dungeonElement.innerHTML = '';
    const size = 20;
    let playerInitialized = false;
    const monsterPositions = new Set();

    // Calculate the player's starting position (assuming bottom center for this example)
    const playerStartIndex = size * size - Math.floor(size / 2);

    // Sort instances by level
    const sortedInstances = instance.sort((a, b) => a.level - b.level);

    // Distribute instances across the dungeon grid
    while (monsterPositions.size < 20) {
        let monsterPos = Math.floor(Math.random() * size * size);
        let distance = Math.abs(playerStartIndex - monsterPos); // Calculate distance from the start

        if (isPositionValidForMonster(monsterPos, size, monsterPositions, distance)) {
            monsterPositions.add({ position: monsterPos, distance: distance });
        }
    }

    // Sort monster positions by distance from start
    let sortedMonsterPositions = Array.from(monsterPositions).sort((a, b) => a.distance - b.distance);

    for (let i = 0; i < size * size; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell fog'; // Start all cells as fogged
        cell.id = 'cell-' + i;

        // Assign instances to monster positions based on sorted order
        const monsterData = sortedMonsterPositions.find(mp => mp.position === i);
        if (monsterData) {
            const instanceIndex = sortedMonsterPositions.indexOf(monsterData);
            const instanceToUse = sortedInstances[instanceIndex % sortedInstances.length];
            addMonsterImage(cell, instanceToUse.monsterImage);
            cell.dataset.monster = instanceToUse.monsters.join(', ');
            cell.dataset.instanceId = instanceToUse.id;
        } else if (Math.random() > 0.7 && !playerInitialized && i === playerStartIndex) {
            cell.classList.add('player');
            setPlayerImage(cell, 'player-front.png'); // Initial player image
            playerInitialized = true;
        } else if (Math.random() > 0.8) {
            cell.className = 'cell wall';
        }

        dungeonElement.appendChild(cell);
    }

    if (!playerInitialized) {
        const cell = document.querySelector(`#cell-${playerStartIndex}`);
        cell.classList.add('player');
        setPlayerImage(cell, 'player-front.png'); // Initial player image
    }
    updateVisibility(); // Ensure visibility is updated after dungeon is generated
    saveDungeonState(); // Save initial state
}

function addMonsterImage(cell, imageUrl) {
    let img = cell.querySelector('img');
    if (!img) {
        img = document.createElement('img');
        img.src = imageUrl;
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';  // Ensures the image covers the cell fully
        cell.appendChild(img);
    }
}




function movePlayer(event) {
    const key = event.key;
    const player = document.querySelector('.player');
    const currentIndex = parseInt(player.id.replace('cell-', ''));
    const size = 20;
    let newIndex, direction;

    switch (key) {
        case 'ArrowUp':
            newIndex = currentIndex - size;
            direction = 'player-back.png';
            break;
        case 'ArrowDown':
            newIndex = currentIndex + size;
            direction = 'player-front.png';
            break;
        case 'ArrowLeft':
            newIndex = currentIndex - 1;
            direction = 'player-left.png';
            break;
        case 'ArrowRight':
            newIndex = currentIndex + 1;
            direction = 'player-right.png';
            break;
        default:
            return; // No movement, so exit function
    }

    const newCell = document.getElementById('cell-' + newIndex);
    if (newCell && !newCell.classList.contains('wall')) {
        console.log(`Moving to cell with monster: ${newCell.dataset.monster}`);
        if (newCell.dataset.monster) {
            console.log("Monster encountered, redirecting...");
            window.location.href = "../../src/index.html";
            return; // Ensure no further processing after redirection
        }

        // Remove the player image from the current cell
        const currentPlayerImage = player.querySelector('img');
        if (currentPlayerImage) {
            currentPlayerImage.remove(); // Use remove() to ensure the image is deleted
        }

        // Mark the new cell as the player's location and add the image
        player.classList.remove('player');
        newCell.classList.add('player');
        setPlayerImage(newCell, direction);

        updateVisibility(); // Update visibility after each move
        saveDungeonState(); // Save state after each move
    }
}

function setPlayerImage(cell, imageName) {
    // Always remove existing image first to ensure fresh update
    let existingImg = cell.querySelector('img');
    if (existingImg) {
        existingImg.remove();
    }

    // Create and append new image element
    let img = document.createElement('img');
    img.src = `../../images/Player/${imageName}`;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.position = 'absolute'; // Ensure it overlays correctly
    img.style.zIndex = 20;
    img.style.top = '0';
    img.style.left = '0';
    cell.appendChild(img);
}




function saveDungeonState() {
    const cells = Array.from(document.querySelectorAll('.cell')).map(cell => ({
        id: cell.id,
        classes: cell.className,
        monster: cell.dataset.monster
    }));
    const playerIndex = document.querySelector('.player').id.replace('cell-', '');
    const playerDirection = document.querySelector('.player img').src.split('/').pop(); // Get the filename of the image

    localStorage.setItem('dungeonState', JSON.stringify(cells));
    localStorage.setItem('playerIndex', playerIndex);
    localStorage.setItem('playerDirection', playerDirection); // Save the current direction of the player
}


function restoreDungeon() {
    const cells = JSON.parse(localStorage.getItem('dungeonState'));
    const dungeonElement = document.getElementById('dungeon');
    const playerDirection = localStorage.getItem('playerDirection'); // Retrieve the last direction of the player
    dungeonElement.innerHTML = '';

    cells.forEach(cellData => {
        const cell = document.createElement('div');
        cell.id = cellData.id;
        cell.className = cellData.classes;
        cell.dataset.monster = cellData.monster || '';
        dungeonElement.appendChild(cell);
        if (cell.classList.contains('player')) {
            setPlayerImage(cell, playerDirection || 'player-front.png'); // Use saved direction or default
        }
    });

    const playerIndex = localStorage.getItem('playerIndex');
    document.getElementById('cell-' + playerIndex).classList.add('player');
    updateVisibility(); // Update visibility based on restored player position
}


function updateVisibility() {
    const player = document.querySelector('.player');
    const currentIndex = parseInt(player.id.replace('cell-', ''));
    const size = 20;

    // Ensure all cells are initially covered in fog
    document.querySelectorAll('.cell').forEach(cell => {
        cell.classList.remove('visible', 'dim');
        cell.classList.add('fog');
        let img = cell.querySelector('img'); // Check for an image element
        if (img) { // If there's an image, hide it
            img.style.display = 'none';
        }
    });

    // Define the visibility range for both visible and dim cells
    let visibleCells = [currentIndex - size, currentIndex + size, currentIndex - 1, currentIndex + 1];
    let dimCells = [currentIndex - size - 1, currentIndex - size + 1, currentIndex + size - 1, currentIndex + size + 1,
                    currentIndex - 2, currentIndex + 2, currentIndex - size * 2, currentIndex + size * 2];

    visibleCells.forEach(index => {
        const cell = document.getElementById('cell-' + index);
        if (cell) {
            cell.classList.remove('fog');
            cell.classList.add('visible');
            let img = cell.querySelector('img');
            if (img) {
                img.style.display = 'block'; // Only show images in visible cells
            }
        }
    });

    dimCells.forEach(index => {
        const cell = document.getElementById('cell-' + index);
        if (cell && !cell.classList.contains('visible')) {
            cell.classList.remove('fog');
            cell.classList.add('dim');
            let img = cell.querySelector('img');
            if (img) {
                img.style.display = 'block'; // Show images dimly
            }
        }
    });
}

/**
 * Check if the position for a monster is valid.
 * @param {number} monsterPos - The proposed position index for the monster.
 * @param {number} size - The width/height of the grid.
 * @param {Set} monsterPositions - A set containing positions of other monsters.
 * @returns {boolean} - Returns true if the position is valid, false otherwise.
 */
function isPositionValidForMonster(monsterPos, size, monsterPositions) {
    // Ensure monsters are not placed in the first or last row, as an example
    const firstRow = Array.from({ length: size }, (_, i) => i);
    const lastRow = Array.from({ length: size }, (_, i) => i + size * (size - 1));

    // Check if the position is in the first or last row
    if (firstRow.includes(monsterPos) || lastRow.includes(monsterPos)) {
        return false;
    }

    // Check the surrounding cells to make sure no other monsters are too close
    const nearbyPositions = [
        monsterPos - 1, // Left
        monsterPos + 1, // Right
        monsterPos - size, // Top
        monsterPos + size, // Bottom
        monsterPos - size - 1, // Top-left
        monsterPos - size + 1, // Top-right
        monsterPos + size - 1, // Bottom-left
        monsterPos + size + 1  // Bottom-right
    ];

    // Validate that no nearby positions already contain a monster
    for (const pos of nearbyPositions) {
        if (monsterPositions.has(pos)) {
            return false;
        }
    }

    return true;
}

function scrollToBottom() {
    const player = document.querySelector('.player');
    player.scrollIntoView(false); // Adjust this to true if you want to align to the top
}
