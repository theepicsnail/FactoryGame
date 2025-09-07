import { Tile, Direction } from "./Tile";
import { Product } from "../Product";
import { directionDelta, oppositeDirection, inputDir } from "../../utils/directionHelpers";
import type { Factory } from "../../core/Factory";

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
    slideSpeed: number = 0.02;
    prevProduct: Product | null = null;

    constructor(outputDir: Direction = "up") {
        this.outputDir = outputDir;
    }

    // Input direction is always 90deg CCW from output
    inputDir(): Direction {
    return inputDir(this.outputDir);
    }

    plan(factory: Factory, row: number, col: number): void {
        if (this.product == null && this.slideProgress >= 1) {
            const [dRow, dCol] = directionDelta(inputDir(this.outputDir));
            const srcRow = row - dRow;
            const srcCol = col - dCol;
            const neighbor = factory.getTile(srcRow, srcCol);
            
            if (neighbor) {
                this.plannedProduct = neighbor.pullProduct(inputDir(this.outputDir), factory, srcRow, srcCol);
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

        let p = this.product;
        let progress = 1;
        if (this.slideProgress < 1 && this.prevProduct) {
            p = this.prevProduct;
            progress = this.slideProgress;
        }
        if (p) {
            let [inRow, inCol] = directionDelta(inputDir(this.outputDir));
            let [outRow, outCol] = directionDelta(this.outputDir);
            let x, y;
            inRow *= .5;
            inCol *= .5;
            outRow *= .5;
            outCol *= .5;
            if (progress < 0.5) {
                const t = progress / 0.5;
                x = (row - inRow) * (1 - t) + row * t;
                y = (col - inCol) * (1 - t) + col * t;
            } else {
                const t = (progress - 0.5) / 0.5;
                x = row * (1 - t) + (row + outRow) * t;
                y = col * (1 - t) + (col + outCol) * t;
            }
            p.renderProduct(ctx, factory, y, x);
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

}
