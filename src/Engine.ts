
import { Factory } from "./Factory";
import { Aseprite } from "./Aseprite";

export class Engine {
    private tileCanvas: HTMLCanvasElement;
    private tileCtx: CanvasRenderingContext2D;
    private productCanvas: HTMLCanvasElement;
    private productCtx: CanvasRenderingContext2D;
    private aseprite: Aseprite;
    private factory: Factory;

    constructor(tileCanvas: HTMLCanvasElement, productCanvas: HTMLCanvasElement, factory: Factory) {
        this.tileCanvas = tileCanvas;
        this.tileCtx = this.tileCanvas.getContext("2d")!;
        this.productCanvas = productCanvas;
        this.productCtx = this.productCanvas.getContext("2d")!;
        this.factory = factory;
        this.setupCanvas();
        this.aseprite = factory.aseprite;
        //this.gameLoop = this.gameLoop.bind(this);
        //requestAnimationFrame(this.gameLoop);
        this.gameLoop();
    }

    gameLoop() {
        requestAnimationFrame(()=>this.gameLoop());
        if(!this.aseprite.isLoaded()) return;
        this.factory.update();
        // Clear both layers
        this.tileCtx.clearRect(0, 0, this.tileCanvas.width, this.tileCanvas.height);
        this.productCtx.clearRect(0, 0, this.productCanvas.width, this.productCanvas.height);
        // Render tiles and products separately
        this.factory.renderTiles(this);
        this.factory.renderProducts(this);
    }

    getTileCtx() {
        return this.tileCtx;
    }
    getProductCtx() {
        return this.productCtx;
    }
    getPixelSize() {
        return 112;
    }
    private setupCanvas() {
        // Set pixelated upscaling for both layers
        this.tileCtx.imageSmoothingEnabled = false;
        this.productCtx.imageSmoothingEnabled = false;
        // (Mouse events can be handled on tileCanvas as before)
        this.tileCanvas.addEventListener('mousemove', (e) => {
            // ...existing code...
        });
        this.tileCanvas.addEventListener('mouseleave', () => {
            // ...existing code...
        });
    }
}