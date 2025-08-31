export class Product {
    row: number;
    col: number;
    pixels: string[][]; // 8x8 grid of color strings
    constructor(row: number, col: number, pixels?: string[][]) {
        this.row = row;
        this.col = col;
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

    render(ctx: CanvasRenderingContext2D, tileSize: number, fillTile: boolean = false) {
        ctx.save();
        const px = this.col * tileSize;
        const py = this.row * tileSize;
        // Scale the 8x8 grid to half the tile size, centered
        const size = tileSize / 2;
        const pixelSize = size / 8;
        const offset = (tileSize - size) / 2;
        for (let y = 0; y < 8; y++) {
            for (let x = 0; x < 8; x++) {
                ctx.fillStyle = this.pixels[y][x];
                ctx.fillRect(
                    px + offset + x * pixelSize,
                    py + offset + y * pixelSize,
                    pixelSize,
                    pixelSize
                );
            }
        }
        ctx.restore();
    }
}
