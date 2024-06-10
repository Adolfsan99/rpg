// Definir personajes
let player = {
    name: '',
    health: 100,
    stamina: 100,
    attack: 10,
    level: 0,
    experience: 0
};

let enemies = [
    { name: 'Ladrón', maxHealth: 50, maxStamina: 100, attack: 15, requiredLevel: 3 },
    { name: 'Pandillero', maxHealth: 75, maxStamina: 100, attack: 20, requiredLevel: 6 },
    { name: 'Jefe de Banda', maxHealth: 100, maxStamina: 100, attack: 30, requiredLevel: 10 }
];

let currentEnemy = {};
let clickCount = 0;
let requiredClicks = 100 * Math.pow(2, player.level);
let defeatedEnemies = 0;
let gameOver = false;

// Función para actualizar la interfaz
function updateUI() {
    document.getElementById('player-name').textContent = `Nombre: ${player.name}`;
    document.getElementById('player-health').textContent = `Salud: ${player.health}`;
    document.getElementById('player-stamina').textContent = `Estamina: ${player.stamina}`;
    document.getElementById('player-level').textContent = `Nivel: ${player.level}`;

    if (currentEnemy.name) {
        document.getElementById('enemy-name').textContent = `Nombre: ${currentEnemy.name}`;
        document.getElementById('enemy-health').textContent = `Salud: ${currentEnemy.health}`;
        document.getElementById('enemy-stamina').textContent = `Estamina: ${currentEnemy.stamina}`;
        document.getElementById('enemy-stats').style.display = 'block';
    } else {
        document.getElementById('enemy-stats').style.display = 'none';
    }
}

// Función para comenzar el juego
function startGame() {
    alert("¡Bienvenido a la aventura!");
    player.name = prompt("¿Cuál es tu nombre, aventurero?");
    if (!player.name) {
        alert("Debes ingresar un nombre para comenzar.");
        startGame();
    } else {
        alert(`Eres ${player.name}, un sujeto cobarde que siempre huye de las peleas. Esta actitud te ha hecho tener una gran culpa presenciando muchas injusticias cometidas en contra de tus amigos y personas que no pueden defenderse. Has decidido entrenar y pelear para defender a los tuyos y cuidar de las personas que viven en tu barrio de los abusos de una nueva banda criminal llamada "Lz Demons", dirigida por un jefe de banda bastante fuerte y poderoso. Tu viaje de entrenamiento, venganza y redención comienza aquí.`);
        updateUI();
        showMainOptions();
    }
}

// Función para mostrar las opciones principales
function showMainOptions() {
    let options = document.getElementById('options');
    options.innerHTML = '';

    let exploreButton = document.createElement('button');
    exploreButton.textContent = 'Explorar la ciudad';
    exploreButton.onclick = exploreCity;
    options.appendChild(exploreButton);

    let homeButton = document.createElement('button');
    homeButton.textContent = 'Ir a casa';
    homeButton.onclick = goHome;
    options.appendChild(homeButton);

    if (!gameOver) {
        let trainButton = document.createElement('button');
        trainButton.textContent = 'Entrenar';
        trainButton.onclick = startTraining;
        options.appendChild(trainButton);
    }
}

// Función para explorar la ciudad y encontrar un enemigo
function exploreCity() {
    currentEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    currentEnemy.health = currentEnemy.maxHealth; // Recuperar la salud del enemigo
    currentEnemy.stamina = currentEnemy.maxStamina; // Recuperar la estamina del enemigo
    document.getElementById('story').textContent = `¡Un ${currentEnemy.name} aparece!`;
    updateUI();
    showCombatOptions();
}

// Función para ir a casa y recuperar salud y estamina
function goHome() {
    player.health = 100;
    player.stamina = 100;
    document.getElementById('story').textContent = `${player.name} ha descansado en casa y recuperado su salud y estamina.`;
    updateUI();
}

// Función para comenzar el entrenamiento
function startTraining() {
    clickCount = 0;
    requiredClicks = getRequiredClicks();
    document.getElementById('training').style.display = 'block';
    document.getElementById('click-count').textContent = `Clics: ${clickCount}`;
    document.getElementById('required-clicks').textContent = `Clics necesarios: ${requiredClicks}`;
    document.getElementById('train-button').onclick = train;
}

// Función de entrenamiento
function train() {
    clickCount++;
    document.getElementById('click-count').textContent = `Clics: ${clickCount}`;
    if (clickCount >= requiredClicks) {
        player.level++;
        document.getElementById('training').style.display = 'none';
        document.getElementById('story').textContent = `¡Felicidades, ${player.name}! Has alcanzado el nivel ${player.level}.`;
        updateUI();
        showMainOptions();
    }
}

// Función para obtener los clics necesarios para subir de nivel
function getRequiredClicks() {
    switch(player.level) {
        case 1:
            return 100;
        case 2:
            return 200;
        case 3:
            return 300;
        case 4:
            return 400;
        case 5:
            return 500;
        case 6:
            return 750;
        case 7:
            return 1000;
        case 8:
            return 1250;
        case 9:
            return 1500;
        case 10:
            return 2000;
        default:
            return 100;
    }
}

// Función para mostrar las opciones de combate
function showCombatOptions() {
    let options = document.getElementById('options');
    options.innerHTML = '';

    let fleeButton = document.createElement('button');
    fleeButton.textContent = 'Huir';
    fleeButton.onclick = flee;
    options.appendChild(fleeButton);

    if (player.level >= 1) {
        let defendButton = document.createElement('button');
        defendButton.textContent = 'Defender';
        defendButton.onclick = defend;
        options.appendChild(defendButton);
    }

    if (player.level >= 2) {
        let lowKickButton = document.createElement('button');
        lowKickButton.textContent = 'Patada baja';
        lowKickButton.onclick = lowKick;
        options.appendChild(lowKickButton);
    }

    if (player.level >= 3) {
        let punchButton = document.createElement('button');
        punchButton.textContent = 'Puñetazo';
        punchButton.onclick = punch;
        options.appendChild(punchButton);
    }

    if (player.level >= 4) {
        let grabButton = document.createElement('button');
        grabButton.textContent = 'Agarre';
        grabButton.onclick = grab;
        options.appendChild(grabButton);
    }
}

// Funciones de combate
function flee() {
    alert(`${player.name} ha huido del ${currentEnemy.name}.`);
    currentEnemy = {};
    document.getElementById('enemy-stats').style.display = 'none';
    showMainOptions();
}

function defend() {
    if (player.stamina >= 20) {
        player.stamina -= 20;
        let evade = Math.random() < 0.5;
        if (evade) {
            alert(`${player.name} ha evadido el ataque del ${currentEnemy.name}.`);
        } else {
            let damage = currentEnemy.attack * 0.5;
            player.health -= damage;
            currentEnemy.health -= damage;
            alert(`${player.name} ha recibido ${damage} de daño del ${currentEnemy.name}.`);
        }
        endTurn();
    } else {
        alert('No tienes suficiente estamina.');
    }
}

function lowKick() {
    if (player.stamina >= 20) {
        player.stamina -= 20;
        currentEnemy.health -= 10;
        currentEnemy.stamina -= 20; // Reduce la estamina del enemigo para simular la reducción de velocidad
        alert(`${player.name} ha realizado una patada baja y causado 10 de daño al ${currentEnemy.name}.`);
        endTurn();
    } else {
        alert('No tienes suficiente estamina.');
    }
}

function punch() {
    if (player.stamina >= 40) {
        player.stamina -= 40;
        if (currentEnemy.stamina < 50) {
            currentEnemy.health -= 20;
            alert(`${player.name} ha realizado un puñetazo y causado 20 de daño al ${currentEnemy.name}.`);
        } else {
            alert(`${player.name} ha fallado el puñetazo, el enemigo tiene demasiada estamina.`);
        }
        endTurn();
    } else {
        alert('No tienes suficiente estamina.');
    }
}

function grab() {
    if (player.stamina >= 60) {
        player.stamina -= 60;
        if (currentEnemy.stamina < 50) {
            currentEnemy.health -= 30;
            alert(`${player.name} ha realizado un agarre y causado 30 de daño al ${currentEnemy.name}.`);
        } else {
            alert(`${player.name} ha fallado el agarre, el enemigo tiene demasiada estamina.`);
        }
        endTurn();
    } else {
        alert('No tienes suficiente estamina.');
    }
}

// Función para finalizar el turno
function endTurn() {
    if (currentEnemy.health <= 0) {
        if (currentEnemy.name === 'Jefe de Banda') {
            alert(`¡Has derrotado al jefe de banda!`);
            alert(`Finalmente ${player.name} ha acabado con la banda de Lz Demons. Con su líder fuera, la banda se desintegró. Esto ha hecho que los tiempos en este barrio sean más pacíficos. Toda tu lucha valió la pena. Derrotaste a ${defeatedEnemies} enemigos.`);
            alert("Fin");
            gameOver = true;
        } else {
            alert(`¡Has derrotado al ${currentEnemy.name}!`);
        }
        defeatedEnemies++;
        player.experience += 10;
        if (player.experience >= 100) {
            player.level++;
            player.experience = 0;
            alert(`${player.name} ha subido de nivel y ahora es nivel ${player.level}.`);
        }
        currentEnemy = {};
        document.getElementById('enemy-stats').style.display = 'none'; // Ocultar las estadísticas del enemigo
        showMainOptions();
    } else {
        player.health -= currentEnemy.attack;
        alert(`El ${currentEnemy.name} te ha atacado y causado ${currentEnemy.attack} de daño.`);
        if (player.health <= 0) {
            alert(`Has sido derrotado por el ${currentEnemy.name}. Fin del juego.`);
            alert("Fin");
            gameOver = true;
            return;
        }
        updateUI();
        showCombatOptions();
    }
}

// Función para finalizar el juego y reiniciar la página
function endGame() {
    location.reload();
}

// Dentro de la función endTurn cuando el juego termina:
if (gameOver) {
    endGame();
}

// Iniciar el juego cuando la página se carga
window.onload = startGame;