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

    constructor(outputDir: Direction = "up") {
        this.outputDir = outputDir;
    }

    plan(factory: Factory, row: number, col: number): void {}
    apply(factory: Factory, row: number, col: number): void {}
    render(ctx: CanvasRenderingContext2D, factory: Factory, row: number, col: number): void {
        const size = factory.tileSize;
        const sprite = DIRECTION_TO_SPRITE[this.outputDir];
        factory.aseprite.drawSprite(ctx, sprite, col * size, row * size, size, size);
    }
    pullProduct(from: Direction, factory: Factory, row: number, col: number): Product | null { 
        return null; 
    }
}
