
import { Aseprite } from "./Aseprite";
import { Product } from "./Product";
import { Factory } from "./Factory";
import { Engine } from "./Engine";


const tileCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const productCanvas = document.getElementById("productCanvas") as HTMLCanvasElement;
const GRID_SIZE = 7; // number of cells per row/col
const CANVAS_SIZE = tileCanvas.width; // assumes square canvas
const factory = new Factory(GRID_SIZE, CANVAS_SIZE, new Aseprite(
    "assets/sprites.json",
    "assets/sprites.png"
));
const engine = new Engine(tileCanvas, productCanvas, factory);