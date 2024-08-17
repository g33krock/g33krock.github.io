import { instance as monsterInstances } from './dungeonInstances.mjs';

const dungeon = document.getElementById('dungeon');
const fightScreen = document.getElementById('fight-screen');
const fightInfo = document.getElementById('fight-info');
const fightButton = document.getElementById('fight-button');

const dungeonSize = 10;
let player = { position: { x: 0, y: 0 } };
let monsters = [];

function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * dungeonSize),
        y: Math.floor(Math.random() * dungeonSize)
    };
}

function initializeMonsters() {
    monsterInstances.forEach(instance => {
        instance.monsters.forEach(monsterName => {
            let position;
            do {
                position = getRandomPosition();
            } while (position.x === player.position.x && position.y === player.position.y);

            monsters.push({
                name: monsterName,
                level: instance.level,
                image: instance.monsterImage,
                position: position
            });
        });
    });
}

function createDungeon() {
    for (let y = 0; y < dungeonSize; y++) {
        for (let x = 0; x < dungeonSize; x++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            tile.id = `tile-${x}-${y}`;
            dungeon.appendChild(tile);
        }
    }
    updateDungeon();
}

function updateDungeon() {
    document.querySelectorAll('.tile').forEach(tile => {
        tile.classList.remove('player', 'monster');
        tile.textContent = '';
    });

    const playerTile = document.getElementById(`tile-${player.position.x}-${player.position.y}`);
    playerTile.classList.add('player');
    playerTile.textContent = 'Player';

    monsters.forEach(monster => {
        const monsterTile = document.getElementById(`tile-${monster.position.x}-${monster.position.y}`);
        monsterTile.classList.add('monster');
        const img = document.createElement('img');
        img.src = monster.image;
        img.alt = monster.name;
        img.style.width = '100%';
        img.style.height = '100%';
        monsterTile.appendChild(img);
    });
}

function movePlayer(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (player.position.y > 0) player.position.y--;
            break;
        case 'ArrowDown':
            if (player.position.y < dungeonSize - 1) player.position.y++;
            break;
        case 'ArrowLeft':
            if (player.position.x > 0) player.position.x--;
            break;
        case 'ArrowRight':
            if (player.position.x < dungeonSize - 1) player.position.x++;
            break;
    }
    checkCollision();
    updateDungeon();
}

function checkCollision() {
    const collidedMonster = monsters.find(monster =>
        monster.position.x === player.position.x && monster.position.y === player.position.y);

    if (collidedMonster) {
        initiateFight(collidedMonster);
    }
}

function initiateFight(monster) {
    fightInfo.textContent = `You encountered a ${monster.name}!`;
    fightScreen.style.display = 'block';
    fightButton.onclick = () => handleFight(monster);
}

function handleFight(monster) {
    // Simulate fight result
    const playerWins = Math.random() > 0.5;

    if (playerWins) {
        monsters = monsters.filter(m => m !== monster);
        alert(`You defeated the ${monster.name}!`);
    } else {
        alert(`You were defeated by the ${monster.name}!`);
    }

    fightScreen.style.display = 'none';
    updateDungeon();
}

document.addEventListener('keydown', movePlayer);

initializeMonsters();
createDungeon();
updateDungeon();
