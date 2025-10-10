import choppedTreeEmoji from "./Choped_downTree.jpg";
import "./style.css";
import treeEmoji from "./TreeEmoji.webp";

// --- GAME CONFIGURATION ---
const CONFIG = {
    // Base values for the upgrade formula: BaseCost * Multiplier^Level
    UPGRADE_BASE_COST: 10,
    COST_MULTIPLIER: 1.15,
    TPS_INCREASE_PER_LEVEL: 1, // How much passive TPS the upgrade adds
    CLICK_POWER: 1, // How many trees the button gives per click
};

// --- GAME STATE ---
// Consolidate all changing variables into a single object for clarity
const gameState = {
    counter: 0,
    upgradeLevel: 0,
    treesPerSecond: 0,
    lastTimestamp: 0, // Used for requestAnimationFrame Delta Time
};

// --- DOM ID REFERENCES ---
const ID = {
    SCORE_DISPLAY: "score-display",
    UPGRADE_BUTTON: "upgrade-button",
    TPS_METER: "trees-per-second-ccounter",
    TREE_ICON: "treeIcon",
    BUTTON_TEXT: "buttonText",
    CHOP_BUTTON: "myButton",
};

// 1. Set up the initial structure
document.body.innerHTML = `
    <h1>DeForrest-Clicker</h1>
    <button id="${ID.CHOP_BUTTON}">
        <img src="${treeEmoji}" class="icon" id="${ID.TREE_ICON}" /> 
        <span id="${ID.BUTTON_TEXT}">Chop</span>
    </button>
    <div id="${ID.SCORE_DISPLAY}">${gameState.counter.toFixed(3)} Tree's Chopped Down</div>
    <button id="${ID.UPGRADE_BUTTON}"> Auto-Click Upgrade | Cost: ${calculateNextCost().toFixed(0)}</button>
    <div id="${ID.TPS_METER}"> Tree's per second: ${gameState.treesPerSecond.toFixed(1)}</div>
`;

// 2. Set references for the elements
const button = document.getElementById(ID.CHOP_BUTTON);
const upButton = document.getElementById(ID.UPGRADE_BUTTON);
const treeIcon = document.getElementById(ID.TREE_ICON) as HTMLImageElement;
const buttonText = document.getElementById(ID.BUTTON_TEXT);
const scoreElement = document.getElementById(ID.SCORE_DISPLAY)!;
const tpsElement = document.getElementById(ID.TPS_METER)!;

// --- FUNCTIONS ---

/** Calculates the exponential cost of the next upgrade level. */
function calculateNextCost(): number {
    return Math.ceil(
        CONFIG.UPGRADE_BASE_COST * Math.pow(CONFIG.COST_MULTIPLIER, gameState.upgradeLevel)
    );
}

/** Updates the score display text on the screen. */
function updateScoreDisplay(): void {
    scoreElement.textContent = `${gameState.counter.toFixed(3)} Tree's Chopped Down`;
}

/** Updates the TPS display text on the screen. */
function updateTpsDisplay(): void {
    tpsElement.textContent = `Tree's per second: ${gameState.treesPerSecond.toFixed(1)}`;
}

/** Handles the logic for purchasing and applying the upgrade. */
function increaseUpgradePower(): void {
    const cost = calculateNextCost();

    if (gameState.counter >= cost) {
        // 1. Deduct cost and update state
        gameState.counter -= cost;
        gameState.upgradeLevel += 1;
        gameState.treesPerSecond += CONFIG.TPS_INCREASE_PER_LEVEL;

        // 2. Update all displays
        updateScoreDisplay();
        updateTpsDisplay();

        // 3. Update the upgrade button text for the *next* level
        upButton!.textContent = `Auto-Click Upgrade | Cost: ${calculateNextCost().toFixed(0)}`;
        console.log("Upgraded!");
    } else {
        console.log("Not enough trees to upgrade.");
    }
}

// --- EVENT LISTENERS ---

// Chop button logic
button?.addEventListener("click", () => {
    // 1. Add click power (fixed amount)
    gameState.counter += CONFIG.CLICK_POWER; 
    updateScoreDisplay();

    // 2. Button cosmetics (should eventually reset with a setTimeout, but we'll keep it simple for now)
    treeIcon.src = choppedTreeEmoji;
    buttonText!.textContent = "CHOPPED!";
});

// Upgrade button logic
upButton?.addEventListener("click", increaseUpgradePower);

// --- GAME LOOP (The Auto-Clicker) ---

function gameLoop(currentTime: number): void {
    // 1. Initialize lastTimestamp on the very first frame
    if (gameState.lastTimestamp === 0) {
        gameState.lastTimestamp = currentTime;
    }

    // 2. Calculate Delta Time
    const elapsed = currentTime - gameState.lastTimestamp;
    
    // 3. Calculate the increase based on elapsed time
    const increaseAmount = gameState.treesPerSecond * (elapsed / 1000); 

    // 4. Update the counter
    gameState.counter += increaseAmount;
    updateScoreDisplay();
    
    // 5. Save the current timestamp for the next frame's calculation
    gameState.lastTimestamp = currentTime;

    // 6. Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop!
requestAnimationFrame(gameLoop);