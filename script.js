"use strict";
const drawMode = document.querySelector(".draw-btn");
const eraseMode = document.querySelector(".erase-btn");
const rainbowMode = document.querySelector(".rainbow-btn");
const initialGridSize = 16;
let drawColor = document.querySelector("#color-picker").value;
let mouseDown = false;

window.addEventListener('load', function() {
  createGridItems(initialGridSize);
  isMouseDown();
  setupSlider();
});

document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX;
  const mouseY = e.clientY;

  const eyes = document.querySelector(".eyes");
  const rect = eyes.getBoundingClientRect();
  const eyesX = rect.left + rect.width / 2;
  const eyesY = rect.top + rect.height / 2;

  const angle = calcAngle(mouseX, mouseY, eyesX, eyesY);

  const leftEye = document.querySelector(".left-eye");
  const rightEye = document.querySelector(".right-eye");
  leftEye.style.transform = `rotate(${angle+135}deg)`;
  rightEye.style.transform = `rotate(${angle+135}deg)`;
});

function calcAngle(cx, cy, ex, ey) {
  const dx = ex - cx;
  const dy = ey - cy;
  const rad = Math.atan2(dy, dx);
  const deg = rad * 180 / Math.PI;
  return deg;
}

function isMouseDown() {
  window.addEventListener("mousedown", () => mouseDown = true);
  window.addEventListener("mouseup", () => mouseDown = false);
  
}

function createGridItems(gridSize) {
  const grid = document.querySelector(".grid-container");
  grid.innerHTML = "";
  grid.style = `grid-template-rows: repeat(${gridSize}, 1fr); grid-template-columns: repeat(${gridSize}, 1fr);`
  for (let i = 0; i < gridSize ** 2; ++i) {
    let newGridItem = document.createElement("div");
    newGridItem.classList.add("grid-item");
    grid.appendChild(newGridItem);
  }
}

function setupSlider() {
  const slider = document.querySelector("#slider");
  const sliderText = document.querySelector("#slider-text");
  slider.addEventListener("input", function() {
      sliderText.innerText = `${slider.value}x${slider.value}`;
      createGridItems(slider.value);
      document.querySelector(".active").click();
  });
}

const clearButton = document.querySelector(".clear-btn");
clearButton.addEventListener("click", clearGrid);

function clearGrid() {
  let gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach(function(item){
    item.style.background = "white";
  });
}

const toggleableButtons = document.querySelectorAll(".toggleable");
toggleableButtons.forEach(function(button) {
  button.addEventListener("click", setMode);
});


function clearButtonStyling() {
  const buttons = document.querySelectorAll(".toggleable");
  buttons.forEach(function(button) {
    button.classList.remove("active");
  });
}

function setMode() {
  clearButtonStyling();
  this.classList.add("active");

  const gridItems = document.querySelectorAll(".grid-item");
  gridItems.forEach(function(item) {
    item.addEventListener("mouseover", setGridItemColor);
    item.addEventListener("mousedown", setGridItemColor);
  });
}

function setGridItemColor(event) {
    if (event.type === "mouseover" && mouseDown === false) return;
    
    if (drawMode.classList.contains("active")) {
      drawColor = document.querySelector("#color-picker").value;
    }
    else if (eraseMode.classList.contains("active")) {
      drawColor = "#ffffff";
    }
    else if (rainbowMode.classList.contains("active")) {
      let red = Math.floor(Math.random() * 256);
      let green = Math.floor(Math.random() * 256);
      let blue = Math.floor(Math.random() * 256);
      drawColor = `rgb(${red}, ${green}, ${blue})`;
    }
    this.style.background = drawColor;
}