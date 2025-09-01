import { Tile, Direction } from "./Tile";
import { Product } from "../Product";
import type { Factory } from "../Factory";

export class EmptyTile implements Tile {
    plan(factory: Factory, row: number, col: number): void {}
    apply(factory: Factory, row: number, col: number): void {}
    renderTile(ctx: CanvasRenderingContext2D, factory: Factory, row: number, col: number): void {}
    renderProduct(ctx: CanvasRenderingContext2D, factory: Factory, row: number, col: number): void {}
    pullProduct(from: Direction, factory: Factory, row: number, col: number): Product | null { return null; }
}
