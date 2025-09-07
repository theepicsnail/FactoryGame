import { Tile, Direction } from "./Tile";
import { Product } from "../Product";
import type { Factory } from "../../core/Factory";

export class EmptyTile implements Tile {
    plan(factory: Factory, row: number, col: number): void {}
    apply(factory: Factory, row: number, col: number): void {}
    render(ctx: CanvasRenderingContext2D, factory: Factory, row: number, col: number): void {
        // EmptyTile doesn't render anything visually
    }
    pullProduct(from: Direction, factory: Factory, row: number, col: number): Product | null { return null; }
}
