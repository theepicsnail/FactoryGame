import { Tile, Direction } from "./Tile";
import { Product } from "../Product";
import type { Factory } from "../../core/Factory";

export class TJunctionTile implements Tile {
    plan(factory: Factory, row: number, col: number): void {}
    apply(factory: Factory, row: number, col: number): void {}
    render(ctx: CanvasRenderingContext2D, factory: Factory, row: number, col: number): void {
        // TJunctionTile doesn't have a visual representation or product to render yet.
        // This method can be implemented later when visuals are added.
    }
    pullProduct(from: Direction, factory: Factory, row: number, col: number): Product | null { return null; }
}
