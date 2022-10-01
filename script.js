"use strict";

window.addEventListener('load', createGridItems);

function createGridItems() {
  const grid = document.querySelector(".grid-container");
  grid.style = "grid-template-rows: repeat(16, 1fr); grid-template-columns: repeat(16, 1fr);"
  for (let i = 0; i < 16*16; ++i) {
    let newGridItem = document.createElement("div");
    newGridItem.classList.add("grid-item");
    grid.appendChild(newGridItem);
  }

  attachEventListeners();
}

const clearButton = document.querySelector(".clear-btn");
clearButton.addEventListener("click", clearGrid);

function attachEventListeners() {
  let gridItems = document.querySelectorAll(".grid-item");

  gridItems.forEach(item => {
    item.addEventListener("click", function() {
      this.style = "background: black;";
    });
  });
}

function clearGrid() {
  let gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach(function(item){
    item.style.background = "white";
  });
}