const container = document.querySelector(".container");
const newGridButton = document.querySelector("#new-grid");
const blackButton = document.querySelector("#black");
const rainbowButton = document.querySelector("#colorful");
const eraserButton = document.querySelector("#eraser");
const clearAllButton = document.querySelector("#clear-all");
const colorPicker = document.querySelector("#color-picker");

let colorMode = "black"; // Default color mode
let isLeftMouseButtonPressed = false;

// Store the original background color
const originalBackgroundColor = getComputedStyle(container).backgroundColor;

// function to create the grid
function createGrid(numSquares) {
  // calculate the size of each square
  const squareSize = 480 / numSquares;

  // remove all existing squares from the container
  while (container.firstChild) {
    container.firstChild.remove();
  }

  // create the new grid
  for (let i = 0; i < numSquares; i++) {
    for (let j = 0; j < numSquares; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      container.appendChild(square);

      // add event listener to change color on mouseover
      square.addEventListener("mouseover", () => {
        if (isLeftMouseButtonPressed) {
          if (colorMode === "black") {
            square.style.backgroundColor = "black";
          } else if (colorMode === "rainbow") {
            if (currentColor === "black" || currentColor === "" || currentColor === originalBackgroundColor) {
              square.style.backgroundColor = getRandomColor();
            } else {
              square.style.backgroundColor = addBlackToColor(currentColor);
            }
          } else if (colorMode === "eraser") {
            square.style.backgroundColor = originalBackgroundColor;
          } else if (colorMode === "custom") {
            square.style.backgroundColor = colorPicker.value;
          }
        }
      });
    }
  }
}

// create initial grid with 16x16 squares
createGrid(16);

// add event listener to the "New Grid" button
newGridButton.addEventListener("click", () => {
  // prompt the user for the number of squares they want in the grid
  const numSquares = prompt("How many squares do you want in the grid?");

  // if user clicks "Cancel" or inputs an invalid number, do nothing
  if (numSquares === null || isNaN(numSquares)) {
    return;
  }

  // create the new grid with the specified number of squares
  createGrid(parseInt(numSquares));
});

// event listeners for left mouse button press and release
document.addEventListener("mousedown", (event) => {
  if (event.button === 0) {
    // Check if the left mouse button is pressed
    isLeftMouseButtonPressed = true;
  }
});

// buttons event listeners

blackButton.addEventListener("click", () => {
  colorMode = "black";
});

colorPicker.addEventListener("input", () => {
  colorMode = "custom";
});

rainbowButton.addEventListener("click", () => {
  colorMode = "rainbow";
});

eraserButton.addEventListener("click", () => {
  colorMode = "eraser";
});

clearAllButton.addEventListener("click", () => {
  const squares = document.querySelectorAll(".square");

  // Reset each square to the original background color
  squares.forEach((square) => {
    square.style.backgroundColor = originalBackgroundColor;
  });
});

document.addEventListener("mouseup", () => {
  isLeftMouseButtonPressed = false;
});

function getRandomColor() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function addBlackToColor(color) {
  const rgbValues = color.substring(4, color.length - 1).split(",");
  const red = parseInt(rgbValues[0].trim());
  const green = parseInt(rgbValues[1].trim());
  const blue = parseInt(rgbValues[2].trim());
  const blackPercentage = 0.1; // 10%

  const newRed = Math.max(0, Math.floor(red - blackPercentage * 255));
  const newGreen = Math.max(0, Math.floor(green - blackPercentage * 255));
  const newBlue = Math.max(0, Math.floor(blue - blackPercentage * 255));

  return `rgb(${newRed}, ${newGreen}, ${newBlue})`;
}
