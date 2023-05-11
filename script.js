const container = document.querySelector(".container");
const newGridButton = document.querySelector("#new-grid");

// function to create the grid
function createGrid(numSquares) {
  // calculate the size of each square
  const squareSize = 480 / numSquares;

  // remove all existing squares from the container
  container.innerHTML = '';

  // create the new grid
  for (let i = 0; i < numSquares * numSquares; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    container.appendChild(square);

    // add event listener to change color on mouseover
    square.addEventListener("mouseover", () => {
      square.style.backgroundColor = "black";
    });
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
