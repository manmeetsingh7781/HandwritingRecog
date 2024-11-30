// get the html objects
const saveButton = document.getElementById("saveButton");
const clearButton = document.getElementById("clearButton");
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
document.getElementById("result").innerText = "-";
// flag when user starts writing
let painting = false;

// attach event listiners
saveButton.addEventListener("click", saveImage);
clearButton.addEventListener("click", clearCanvas);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", stopPainting);
canvas.addEventListener("mouseout", stopPainting);
canvas.addEventListener("mousemove", sketch);

clearCanvas();

// clear canvas back to white
function clearCanvas() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// process image
// this function captures the canvas and sends it to python
// which then writes to file and run deep learning model to identify user given input
async function saveImage() {
  const imageData = canvas.toDataURL("image/png");
  const img = new Image();
  img.src = imageData;

  await fetch("https://handwritingrecoginition.onrender.com/process_image", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image: imageData,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.getElementById("result").innerText = data.output;
    })
    .catch((error) => {
      console.log(error);
    });
}

function startPainting(e) {
  painting = true;
  draw(e);
}

function stopPainting() {
  painting = false;
  ctx.beginPath();
}

function sketch(e) {
  if (!painting) return;
  draw(e);
}

function draw(e) {
  if (!painting) return;
  ctx.lineWidth = 10;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  ctx.strokeStyle = "black";

  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}
