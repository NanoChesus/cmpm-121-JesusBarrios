import choppedTreeEmoji from "./Choped_downTree.jpg";
import "./style.css";
import treeEmoji from "./TreeEmoji.webp";

// 1. Set up the initial structure with an ID for the image
document.body.innerHTML = `
    <h1>DeForrest-Clicker</h1>
    <button id="myButton">
        <img src="${treeEmoji}" class="icon" id="treeIcon" /> 
        <span id="buttonText">Chop</span>
    </button>
`;

// 2. Set references for the elements you want to manipulate
const button = document.getElementById("myButton");
const treeIcon = document.getElementById("treeIcon") as HTMLImageElement;
const buttonText = document.getElementById("buttonText");

// 3. Event listener to perform the swap
button?.addEventListener("click", () => {
  if (treeIcon) {
    // Change the source of the image to the chopped tree
    treeIcon.src = choppedTreeEmoji;
  }

  if (buttonText) {
    // Change the text separately
    buttonText.textContent = "Clicked!";
  }
});
