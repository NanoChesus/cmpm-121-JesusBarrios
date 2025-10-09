import choppedTreeEmoji from "./Choped_downTree.jpg";
import "./style.css";
import treeEmoji from "./TreeEmoji.webp";

//variables
let counter = 0;
const counterId = "score-display";

// 1. Set up the initial structure with an ID for the image
document.body.innerHTML = `
    <h1>DeForrest-Clicker</h1>
    <button id="myButton">
        <img src="${treeEmoji}" class="icon" id="treeIcon" /> 
        <span id="buttonText">Chop</span>
    </button>
    <div id= "${counterId}">${counter} Tree's Chopped Down</div>
`;

// 2. Set references for the elements you want to manipulate
const button = document.getElementById("myButton");
const treeIcon = document.getElementById("treeIcon") as HTMLImageElement;
const buttonText = document.getElementById("buttonText");
const scoreElement = document.getElementById(counterId);

// ---- functions -----

//updates counter and text
function updateCounter() {
  counter += 1;
  scoreElement!.textContent = `${counter} Tree's Chopped Down`;
  console.log("counter updated");
}

// 3. Event listener to perform the swap
button?.addEventListener("click", () => {
  updateCounter();
  if (treeIcon) {
    // Change the source of the image to the chopped tree
    treeIcon.src = choppedTreeEmoji;
  }

  if (buttonText) {
    // Change the text separately
    buttonText.textContent = "Clicked!";
  }

  if (scoreElement!) {
    console.error(`Element with ID '${counterId}' not found.`);
    // Stop execution if the element is missing
    throw new Error("Missing score element.");
  }
});
