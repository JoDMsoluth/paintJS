const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
//Array.form(obj) -> obj를 array로 바꿈
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "black";
const CANVAS_SIZE = "300";


canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// css에서 설정을 해도 따로 변수에 pixel modified하지 않으면 그려지지 않음


ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;
let isPainting = true;


function onMouseEnter(event) {
  // clientX,Y는 윈도우에서의 위치
  // offsetX,Y는 캔버스에서의 위치
  const x = event.offsetX;
  const y = event.offsetY;
  if(isPainting) {
      if(!painting)
    {
      ctx.beginPath(); // path is line
      ctx.moveTo(x, y);
    } else {
      {
        ctx.lineTo(x, y); // 지금위치까지의 선을 글미
        ctx.stroke();
      }
    }
  }
}

function stopPainting(event) {
  painting = false;
}

function startPainting(event) {
  painting = true;
}

function onMouseDown(event) {
  painting = true;

}

function onMouseUp(event) {
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const rangeValue = event.target.value;
  ctx.lineWidth = rangeValue;
}

function handleModeClick() {
  if(filling === true)
  {
    filling = false;
    isPainting = true;
    mode.innerText="FILL";
  }else {
    filling = true;
    isPainting = false;
    mode.innerText="PAINT";
  }
}

function handleCanvasClick(){
  if(filling ===true){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
    }
}

function handleCM(event){
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

if(canvas) {
  canvas.addEventListener("mousemove",onMouseEnter);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

if(range) {
  range.addEventListener("input", handleRangeChange);
}

if(mode) {
  mode.addEventListener("click",handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

Array.from(colors).forEach(color =>
color.addEventListener("click",handleColorClick)
);
