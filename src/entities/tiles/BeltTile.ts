import { Tile, Direction } from "./Tile";
import { Product } from "../Product";
import { directionDelta, oppositeDirection } from "../../utils/directionHelpers";
import type { Factory } from "../../core/Factory";

const DIRECTION_TO_SPRITE: Record<Direction, string> = {
    up: "BeltN",
    down: "BeltS",
    left: "BeltW",
    right: "BeltE"
};

export class BeltTile implements Tile {
    direction: Direction;
    product: Product | null = null;
    plannedProduct: Product | null = null;
    slideProgress: number = 1; // 1 = fully in this tile, 0 = just entered
    slideSpeed: number = 0.02; // Fraction per tick (adjust for speed)
    prevProduct: Product | null = null; // For animating incoming product

    constructor(direction: Direction = "up") {
        this.direction = direction;
    }
    plan(factory: Factory, row: number, col: number): void {
        if (this.product != null || this.slideProgress < 1) {
            this.plannedProduct = null;
            return;
        }
        const [dRow, dCol] = directionDelta(oppositeDirection(this.direction));
        const srcRow = row + dRow;
        const srcCol = col + dCol;
        const neighbor = factory.getTile(srcRow, srcCol);
        if (!neighbor) {
            this.plannedProduct = null;
            return;
        }
        this.plannedProduct = neighbor.pullProduct(this.direction, factory, srcRow, srcCol);
    }

    apply(factory: Factory, row: number, col: number): void {
        // If animating, increment progress
        if (this.slideProgress < 1) {
            this.slideProgress += this.slideSpeed;
            if (this.slideProgress > 1) this.slideProgress = 1;
            // When animation completes, set product
            if (this.slideProgress >= 1 && this.prevProduct) {
                this.product = this.prevProduct;
                this.prevProduct = null;
            }
        } else if (this.product == null && this.plannedProduct) {
            // Start animating new product in
            this.prevProduct = this.plannedProduct;
            this.slideProgress = 0;
            this.plannedProduct = null;
        }
    }

    render(ctx: CanvasRenderingContext2D, factory: Factory, row: number, col: number): void {
        const size = factory.tileSize;
        // Highlight if tile has a product
        if (this.prevProduct) {
            ctx.save();
            ctx.strokeStyle = "#ffd600";
            ctx.lineWidth = 4;
            ctx.globalAlpha = 0.6;
            ctx.strokeRect(col * size + 2, row * size + 2, size - 4, size - 4);
            ctx.restore();
        }
        const sprite = DIRECTION_TO_SPRITE[this.direction];
        factory.aseprite.drawSprite(ctx, sprite, col * size, row * size, size, size);

        let p = this.product;
        let progress = 1;
        if (this.slideProgress < 1 && this.prevProduct) {
            p = this.prevProduct;
            progress = this.slideProgress;
        }
        if (p) {
            const [dRow, dCol] = directionDelta(oppositeDirection(this.direction));
            const fromX = col + dCol;
            const fromY = row + dRow;
            progress += .5;
            const x = (fromX * (1 - progress)) + (col * progress);
            const y = (fromY * (1 - progress)) + (row * progress);
            p.renderProduct(ctx, factory, x, y);
        }
    }

    pullProduct(from: Direction, factory: Factory, row: number, col: number): Product | null {
        // Only allow pulling from the direction the belt is moving towards
        if (from === this.direction && this.product) {
            const p = this.product;
            this.product = null;
            return p;
        }
        return null;
    }
}
