import { createCanvas, loadImage } from "canvas";

async function createImageFromName(name) {
  const canvas = createCanvas(100, 100);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "#ececec";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = "bold 32px Arial";
  ctx.fillStyle = "#000";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  const firstLetter = name.charAt(0).toUpperCase();
  ctx.fillText(firstLetter, canvas.width / 2, canvas.height / 2);
}

export { createImageFromName };
