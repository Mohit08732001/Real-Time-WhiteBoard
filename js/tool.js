const board = document.querySelector(".board");
board.height = window.innerHeight;
board.width = window.innerWidth;

const ctx = board.getContext("2d");
ctx.strokeStyle = "blue";
ctx.imageSmoothingEnabled = true;
ctx.lineJoin = "round";
ctx.lineCap = "round";
ctx.miterLimit = 1;
ctx.imageSmoothingQuality = "high";
ctx.lineWidth = 3;

// ************************Change Size**************************//
function sizeChange(value) {
  ctx.lineWidth = value;
}

// ************************Tool Change**************************//
function handleLocaltoolChange(tool) {
  handleToolChange(tool);
  if (tool != "sticky");
}
// ************************Handle color*************************//
function handleColorChange(color) {
  ctx.strokeStyle = color;
}

const hamburger = document.querySelector(".hamburger");
const toolPanel = document.querySelector(".tool-panel");
hamburger.addEventListener("click", function () {
  handleHamburger()
});