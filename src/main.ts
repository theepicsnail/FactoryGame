
import { Aseprite } from "./Aseprite";
import { Product } from "./Product";
import { Factory } from "./Factory";
import { Engine } from "./Engine";


const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const GRID_SIZE = 7; // number of cells per row/col
const CANVAS_SIZE = canvas.width; // assumes square canvas
const factory = new Factory(GRID_SIZE, CANVAS_SIZE, new Aseprite(
    "src/assets/sprites.json",
    "src/assets/sprites.png"
));
const engine = new Engine(canvas, factory);