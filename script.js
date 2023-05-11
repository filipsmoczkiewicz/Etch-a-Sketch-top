const container = document.querySelector(".container");

// create 16x16 grid
for (let i = 0; i < 256; i++) {
  const square = document.createElement("div");
  square.classList.add("square");
  container.appendChild(square);

  // add event listener to change color on mouseover
  square.addEventListener("mouseover", () => {
    square.style.backgroundColor = "black";
  });
}