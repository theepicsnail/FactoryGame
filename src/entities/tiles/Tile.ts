import { Product } from "../Product";
import type { Factory } from "../../core/Factory";
import { Direction } from "../utils/directionHelpers";

export interface Tile {
    // Phase 1: Decide what to do this tick
    plan(factory: Factory, row: number, col: number): void;
    // Phase 2: Apply the planned action
    apply(factory: Factory, row: number, col: number): void;
    // Rendering (split for layering)
    render(ctx: CanvasRenderingContext2D, factory: Factory, row: number, col: number): void;
    // Required for pull-based logic
    pullProduct(from: Direction, factory: Factory, row: number, col: number): Product | null;
}
