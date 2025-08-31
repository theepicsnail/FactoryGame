
import { Factory } from "./Factory";
import { Aseprite } from "./Aseprite";

export class Engine {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private aseprite: Aseprite;
    private factory: Factory;

    constructor(canvas: HTMLCanvasElement, factory: Factory) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d")!;
        this.factory = factory;
        this.setupCanvas();
        this.aseprite = factory.aseprite;
        this.gameLoop = this.gameLoop.bind(this);
        requestAnimationFrame(this.gameLoop);
    }

    gameLoop() {
        requestAnimationFrame(this.gameLoop);
        if(!this.aseprite.isLoaded()) return;
        this.factory.update();
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.factory.render(this);
    }

    getCtx() {
        return this.ctx;
    }

    getPixelSize() {
        return 112;
    }

    private setupCanvas() {
        // Set pixelated upscaling
        this.ctx.imageSmoothingEnabled = false;

        // Track mouse position and highlight cell
        this.canvas.addEventListener('mousemove', (e) => {
            // if (!factory) return;
            // const rect = canvas.getBoundingClientRect();
            // const x = e.clientX - rect.left;
            // const y = e.clientY - rect.top;
            // const cellX = Math.floor(x / factory.tileSize);
            // const cellY = Math.floor(y / factory.tileSize);
            // if (
            //     cellX >= 0 && cellX < factory.gridSize &&
            //     cellY >= 0 && cellY < factory.gridSize
            // ) {
            //     factory.setHighlightCell({ x: cellX, y: cellY });
            // } else {
            //     factory.setHighlightCell(null);
            // }
        });
        this.canvas.addEventListener('mouseleave', () => {
            //if (factory) factory.setHighlightCell(null);
        });
    }
}

export interface Renderable {
    render(renderer: Engine, px: number, py: number): void;
}
export interface Updatable {
    update(engine: Engine): void;
}