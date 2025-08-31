
import { Aseprite } from "./Aseprite";
import { Product } from "./Product";
import { Factory } from "./Factory";



const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
// Set pixelated upscaling
ctx.imageSmoothingEnabled = false;



// Track mouse position and highlight cell
canvas.addEventListener('mousemove', (e) => {
    if (!factory) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellX = Math.floor(x / factory.tileSize);
    const cellY = Math.floor(y / factory.tileSize);
    if (
        cellX >= 0 && cellX < factory.gridSize &&
        cellY >= 0 && cellY < factory.gridSize
    ) {
        factory.setHighlightCell({ x: cellX, y: cellY });
    } else {
        factory.setHighlightCell(null);
    }
});
canvas.addEventListener('mouseleave', () => {
    if (factory) factory.setHighlightCell(null);
});

// Track mouse position and highlight cell
canvas.addEventListener('mousemove', (e) => {
    if (!factory) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cellX = Math.floor(x / factory.tileSize);
    const cellY = Math.floor(y / factory.tileSize);
    if (
        cellX >= 0 && cellX < factory.gridSize &&
        cellY >= 0 && cellY < factory.gridSize
    ) {
        factory.setHighlightCell({ x: cellX, y: cellY });
    } else {
        factory.setHighlightCell(null);
    }
});
canvas.addEventListener('mouseleave', () => {
    if (factory) factory.setHighlightCell(null);
});


const GRID_SIZE =7; // number of cells per row/col
const CANVAS_SIZE = canvas.width; // assumes square canvas


let factory: Factory | null = null;
let product: Product | null = null;
const aseprite = new Aseprite(
    "src/assets/sprites.json",
    "src/assets/sprites.png",
    () => {
        factory = new Factory(GRID_SIZE, CANVAS_SIZE, aseprite);
        // Example product at row 3, col 3
        product = new Product(3, 3);
        requestAnimationFrame(gameLoop);
    }
);


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (factory) {
        factory.render(ctx);
    }
    if (product && factory) {
        // Draw the product scaled to fill the tile (same as tile sprite scale)
        product.render(ctx, factory.tileSize, true);
    }
    requestAnimationFrame(gameLoop);
}