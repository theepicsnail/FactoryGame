import { Engine } from "../core/Engine";
import { Factory } from "../core/Factory";

export class Product {
    pixels: string[][]; // 8x8 grid of color strings
    constructor(pixels?: string[][]) {
        // If no pixel data is provided, fill with a default pattern
        this.pixels = pixels || Product.defaultPixels();
    }

    static defaultPixels(): string[][] {
        // Example: diagonal rainbow pattern
        const colors = ["#ff9800", "#f44336", "#4caf50", "#2196f3", "#9c27b0", "#ffeb3b", "#00bcd4", "#e91e63"];
        return Array.from({ length: 8 }, (_, y) =>
            Array.from({ length: 8 }, (_, x) => colors[(x + y) % colors.length])
        );
    }

    renderProduct(ctx: CanvasRenderingContext2D, factory: Factory, px: number, py: number) {
        
        // Scale the 8x8 grid to half the tile size, centered
        const tileSize = factory.tileSize;
        const size = tileSize / 2;
        const pixelSize = size / 8;
        const offset = (tileSize - size) / 2;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                ctx.fillStyle = this.pixels[y][x];
                ctx.fillRect(
                    px * tileSize + offset + x * pixelSize,
                    py * tileSize + offset + y * pixelSize,
                    pixelSize,
                    pixelSize
                );
            }
        }
    }
}
