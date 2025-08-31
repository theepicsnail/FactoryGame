import { Tile, Direction } from "./Tile";
import { Product } from "../Product";
import type { Factory } from "../Factory";

const DIRECTION_TO_SPRITE: Record<Direction, string> = {
    up: "LeftN",
    down: "LeftS",
    left: "LeftW",
    right: "LeftE"
};


export class LeftTurnTile implements Tile {
    outputDir: Direction;
    product: Product | null = null;
    plannedProduct: Product | null = null;
    slideProgress: number = 1; // 1 = fully out, 0 = just entered
    slideSpeed: number = 0.01;
    prevProduct: Product | null = null;

    constructor(outputDir: Direction = "up") {
        this.outputDir = outputDir;
    }

    // Input direction is always 90deg CCW from output
    inputDir(): Direction {
        switch (this.outputDir) {
            case "up": return "right";
            case "right": return "down";
            case "down": return "left";
            case "left": return "up";
        }
    }

    plan(factory: Factory, row: number, col: number): void {
        if (this.product == null && this.slideProgress >= 1) {
            const [dRow, dCol] = LeftTurnTile.directionDelta(this.inputDir());
            const srcRow = row - dRow;
            const srcCol = col - dCol;
            const neighbor = factory.getTile(srcRow, srcCol);
            
            if (neighbor) {
                this.plannedProduct = neighbor.pullProduct(this.inputDir(), factory, srcRow, srcCol);
            } else {
                this.plannedProduct = null;
            }
        } else {
            this.plannedProduct = null;
        }
    }

    apply(factory: Factory, row: number, col: number): void {
        if (this.slideProgress < 1) {
            this.slideProgress += this.slideSpeed;
            if (this.slideProgress > 1) this.slideProgress = 1;
            if (this.slideProgress === 1 && this.prevProduct) {
                this.product = this.prevProduct;
                this.prevProduct = null;
            }
        } else if (this.product == null && this.plannedProduct) {
            this.prevProduct = this.plannedProduct;
            this.slideProgress = 0;
            this.plannedProduct = null;
        }
    }

    render(ctx: CanvasRenderingContext2D, factory: Factory, row: number, col: number): void {
        const size = factory.tileSize;
        const sprite = DIRECTION_TO_SPRITE[this.outputDir];
        factory.aseprite.drawSprite(ctx, sprite, col * size, row * size, size, size);
        // Render product moving from inputDir to center, then center to outputDir
        let p = this.product;
        let progress = 1;
        if (this.slideProgress < 1 && this.prevProduct) {
            p = this.prevProduct;
            progress = this.slideProgress;
        }
        if (p) {
            // Animation: 0-0.5 = input->center, 0.5-1 = center->output
            const [inRow, inCol] = LeftTurnTile.directionDelta(this.inputDir());
            const [outRow, outCol] = LeftTurnTile.directionDelta(this.outputDir);
            let x, y;
            if (progress < 0.5) {
                // From input to center
                const t = progress / 0.5;
                x = (row - inRow) * (1 - t) + row * t;
                y = (col - inCol) * (1 - t) + col * t;
            } else {
                // From center to output
                const t = (progress - 0.5) / 0.5;
                x = row * (1 - t) + (row + outRow) * t;
                y = col * (1 - t) + (col + outCol) * t;
            }
            // Product.render expects Engine, px, py. We'll fake an Engine-like object for ctx/tileSize
            const fakeEngine = {
                getCtx: () => ctx,
                getPixelSize: () => size
            } as any;
            p.render(fakeEngine, y, x); // Note: y, x because col=row, row=col
        }
    }

    pullProduct(from: Direction, factory: Factory, row: number, col: number): Product | null {
        // Only allow pulling from the output direction
        if (from === this.outputDir && this.product) {
            const p = this.product;
            this.product = null;
            return p;
        }
        return null;
    }

    static directionDelta(dir: Direction): [number, number] {
        switch (dir) {
            case "up": return [-1, 0];
            case "down": return [1, 0];
            case "left": return [0, -1];
            case "right": return [0, 1];
        }
    }
}
