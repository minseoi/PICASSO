const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.getElementById("colorpicker");
const range = document.getElementById("jsRange");
const uploadBtn = document.getElementById("uploadBtn");

const brush = document.getElementById("jsBrush");
const erase = document.getElementById("jsErase");
const fill = document.getElementById("jsFill");

const INITIAL_COLOR = "#000000";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let isBrushMode = true;

let painting = false; //마우스 누르고 있는지 아닌지

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    if(isBrushMode) {
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.clearRect(
        x - ctx.lineWidth / 2,
        y - ctx.lineWidth / 2,
        ctx.lineWidth,
        ctx.lineWidth
      );
    }
  }
}

function handleColorClick(event) {
  const color = event.target.value;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleFillClick() {
  ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}

function handleSelectBrush() {
  isBrushMode = true;
  updateSelection();
}

brush.addEventListener("click", handleSelectBrush);

function handleSelectErase() {
  isBrushMode = false;
  updateSelection();
}

erase.addEventListener("click", handleSelectErase);

function updateSelection() {
  if(isBrushMode) {
    brush.classList.add("selected");
    erase.classList.remove("selected");
  } else {
    erase.classList.add("selected");
    brush.classList.remove("selected");
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleUploadClick() {
  const author = document.getElementById("uploadInfo-author").value;
  const title = document.getElementById("uploadInfo-title").value;
  const desc = document.getElementById("uploadInfo-desc").value;
  const image = canvas.toDataURL();

  fetch("https://ise.kro.kr:8123/api/drawing", {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      author: author,
      title: title,
      desc: desc,
      image: image
    }),
  })

  location.reload();
}

function clearCanvas()
{
    // context
    var ctx = canvas.getContext('2d');

    // 픽셀 정리
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    // 컨텍스트 리셋
    ctx.beginPath();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("contextmenu", handleCM);
}

colorPicker.addEventListener("change", handleColorClick);

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (fill) {
  fill.addEventListener("click", handleFillClick);
}

if (uploadBtn) {
  uploadBtn.addEventListener("click", handleUploadClick);
}