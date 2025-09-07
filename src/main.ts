
import { Aseprite } from "./assets/Aseprite";
import { Product } from "./entities/Product";
import { Factory } from "./core/Factory";
import { Engine } from "./core/Engine";
import "./assets/style.css";


const tileCanvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const productCanvas = document.getElementById("productCanvas") as HTMLCanvasElement;
const GRID_SIZE = 7; // number of cells per row/col
const CANVAS_SIZE = tileCanvas.width; // assumes square canvas
const factory = new Factory(GRID_SIZE, CANVAS_SIZE, new Aseprite(
    "assets/sprites.json",
    "assets/sprites.png"
));
const engine = new Engine(tileCanvas, productCanvas, factory);