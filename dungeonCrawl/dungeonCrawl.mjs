const gameContainer = document.getElementById('game-container');
const gridSize = 20; // Set the grid size to 20x20

const tileTypes = ['floor', 'wall'];
const monsterTypes = ['goblin', 'orc', 'vampire', 'necromancer', 'werewolf', 'elemental', 'mindflayer', 'ogre', 'dragon', 'skeleton', 'phoenix'];

const initialPlayerPosition = { x: 1, y: 1 };
const player = {
    x: initialPlayerPosition.x,
    y: initialPlayerPosition.y,
    element: createTile('player', '../images/Player/player-front.png'),
    direction: 'front' // initial direction
};

let dungeon = [];
let monsters = [];
let treasures = [];

function createTile(type, backgroundImage = '') {
    const tile = document.createElement('div');
    tile.classList.add('tile', type);
    if (backgroundImage) {
        tile.style.backgroundImage = `url('${backgroundImage}')`;
    }
    return tile;
}

function generateDungeon() {
    console.log("Generating dungeon...");
    gameContainer.innerHTML = ''; // Clear any existing tiles
    dungeon = []; // Reset dungeon array
    monsters = []; // Reset monsters array
    treasures = []; // Reset treasures array

    // Set the game container size
    gameContainer.style.gridTemplateColumns = `repeat(${gridSize}, 50px)`;
    gameContainer.style.gridTemplateRows = `repeat(${gridSize}, 50px)`;

    // Initialize dungeon with walls
    for (let y = 0; y < gridSize; y++) {
        const row = [];
        for (let x = 0; x < gridSize; x++) {
            const tile = createTile('wall');
            row.push(tile);
            gameContainer.appendChild(tile);
        }
        dungeon.push(row);
    }

    // Generate maze starting from player's initial position
    carvePath(initialPlayerPosition.x, initialPlayerPosition.y);

    // Ensure starting position is floor and place the player
    player.x = initialPlayerPosition.x;
    player.y = initialPlayerPosition.y;
    dungeon[player.y][player.x] = createTile('floor');
    placePlayer();

    // Place monsters and treasures
    placeMonstersAndTreasures();

    // Place door at bottom right-most accessible portion
    placeDoor();

    // Update view range
    updateViewRange();

    // Scroll to ensure player is visible
    scrollToPlayer();
}

function carvePath(x, y) {
    dungeon[y][x] = createTile('floor');
    gameContainer.replaceChild(dungeon[y][x], gameContainer.children[y * gridSize + x]);

    const directions = shuffle([
        [2, 0],
        [-2, 0],
        [0, 2],
        [0, -2]
    ]);

    for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (isValid(nx, ny) && dungeon[ny][nx].classList.contains('wall')) {
            dungeon[y + dy / 2][x + dx / 2] = createTile('floor');
            dungeon[ny][nx] = createTile('floor');
            gameContainer.replaceChild(dungeon[y + dy / 2][x + dx / 2], gameContainer.children[(y + dy / 2) * gridSize + (x + dx / 2)]);
            gameContainer.replaceChild(dungeon[ny][nx], gameContainer.children[ny * gridSize + nx]);
            carvePath(nx, ny);
        }
    }
}

function isValid(x, y) {
    return x >= 0 && x < gridSize && y >= 0 && y < gridSize;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function placePlayer() {
    console.log(`Placing player at (${player.x}, ${player.y})`);
    dungeon[player.y][player.x].replaceWith(player.element);
    dungeon[player.y][player.x] = player.element;
    gameContainer.replaceChild(player.element, gameContainer.children[player.y * gridSize + player.x]);
}

function placeMonstersAndTreasures() {
    for (let i = 0; i < 20; i++) { // Increase the number of monsters and treasures for a larger map
        placeRandom('monster', `../images/${monsterTypes[i % monsterTypes.length]}.png`, monsters);
        placeRandom('treasure', '../images/treasure.png', treasures);
    }
}

function placeRandom(type, image, collection) {
    let x, y;
    do {
        x = Math.floor(Math.random() * gridSize);
        y = Math.floor(Math.random() * gridSize);
    } while (dungeon[y][x].classList.contains('wall') || dungeon[y][x].classList.contains(type) || (x === player.x && y === player.y));

    const element = createTile(type, image);
    dungeon[y][x].replaceWith(element);
    dungeon[y][x] = element;
    gameContainer.replaceChild(element, gameContainer.children[y * gridSize + x]);
    collection.push({ x, y, element });
}

function placeDoor() {
    let x = gridSize - 1;
    let y = gridSize - 1;

    // Find the bottom right-most accessible floor tile
    while (dungeon[y][x].classList.contains('wall')) {
        if (x > 0) {
            x--;
        } else if (y > 0) {
            x = gridSize - 1;
            y--;
        } else {
            break; // safety check to avoid infinite loop
        }
    }

    const door = createTile('door', '../images/door.png');
    dungeon[y][x].replaceWith(door);
    dungeon[y][x] = door;
    gameContainer.replaceChild(door, gameContainer.children[y * gridSize + x]);
}

function movePlayer(dx, dy, direction) {
    const newX = player.x + dx;
    const newY = player.y + dy;

    if (newX < 0 || newX >= gridSize || newY < 0 || newY >= gridSize || dungeon[newY][newX].classList.contains('wall')) return;

    // Replace current player position with a floor tile
    dungeon[player.y][player.x].replaceWith(createTile('floor'));
    dungeon[player.y][player.x] = createTile('floor');
    gameContainer.replaceChild(dungeon[player.y][player.x], gameContainer.children[player.y * gridSize + player.x]);

    // Move player to new position
    player.x = newX;
    player.y = newY;

    // Update player direction
    player.element.style.backgroundImage = `url('../images/Player/player-${direction}.png')`;
    player.direction = direction;

    interactWithTile(newX, newY);

    // Place player at new position
    placePlayer();

    // Update view range
    updateViewRange();

    // Scroll to ensure player is visible
    scrollToPlayer();
}

function interactWithTile(x, y) {
    if (dungeon[y][x].classList.contains('monster')) {
        console.log('Encountered a monster!');
        window.location.href = "../src/index.html"
        // Handle monster encounter
    } else if (dungeon[y][x].classList.contains('treasure')) {
        console.log('Found a treasure!');
        treasures = treasures.filter(treasure => !(treasure.x === x && treasure.y === y));
        dungeon[y][x] = createTile('floor');
        gameContainer.replaceChild(dungeon[y][x], gameContainer.children[y * gridSize + x]);
    } else if (dungeon[y][x].classList.contains('door')) {
        console.log('Reached the door!');
        resetPlayer();
        generateDungeon(); // Reset dungeon and player position
    }
}

function resetPlayer() {
    player.x = initialPlayerPosition.x;
    player.y = initialPlayerPosition.y;
    placePlayer();
    placeDoor(); // Ensure the new door is placed after the player is reset
}

function updateViewRange() {
    for (let y = 0; y < gridSize; y++) {
        for (let x = 0; x < gridSize; x++) {
            if (Math.abs(player.x - x) <= 1 && Math.abs(player.y - y) <= 1) {
                dungeon[y][x].style.filter = 'none';
            } else {
                dungeon[y][x].style.filter = 'brightness(0)';
            }
        }
    }
}

function scrollToPlayer() {
    const playerTile = gameContainer.children[player.y * gridSize + player.x];
    playerTile.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });
}

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            movePlayer(0, -1, 'back');
            break;
        case 'ArrowDown':
            movePlayer(0, 1, 'front');
            break;
        case 'ArrowLeft':
            movePlayer(-1, 0, 'left');
            break;
        case 'ArrowRight':
            movePlayer(1, 0, 'right');
            break;
    }
});

generateDungeon();
