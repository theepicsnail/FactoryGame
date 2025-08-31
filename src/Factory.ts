import { Aseprite } from "./Aseprite";

export class Factory {
    gridSize: number;
    tileSize: number;
    canvasSize: number;
    aseprite: Aseprite;
    grid: string[][];
    highlightCell: { x: number; y: number } | null = null;
    constructor(gridSize: number, canvasSize: number, aseprite: Aseprite) {
        this.gridSize = gridSize;
        this.canvasSize = canvasSize;
        this.tileSize = canvasSize / gridSize;
        this.aseprite = aseprite;
        // Example: fill grid with some sprite names
        this.grid = [
            ["Empty","BestW","Empty","Empty","Empty","Empty","Empty"],
            ["Empty","Empty","BeltE","Empty","Empty","Empty","Empty"],
            ["Empty","Empty","RightN","BeltE","RightE","Empty","Empty"],
            ["BeltE","BeltE","SplitE","BG","MultE","BeltE","BeltE"],
            ["Empty","Empty","LeftS","BeltE","LeftE","Empty","Empty"],
            ["Empty","Empty","Empty","Empty","Empty","Empty","Empty"],
            ["Empty","Empty","Empty","Empty","Empty","Empty","Empty"]
        ];
    }
    setHighlightCell(cell: { x: number; y: number } | null) {
        this.highlightCell = cell;
    }
    drawGrid(ctx: CanvasRenderingContext2D) {
        this.aseprite.drawSprite(ctx, "BG", 0,0,this.canvasSize, this.canvasSize);
    }
    drawHighlight(ctx: CanvasRenderingContext2D) {
        if (this.highlightCell) {
            ctx.save();
            ctx.fillStyle = 'rgba(255,255,0,0.3)';
            ctx.fillRect(
                this.highlightCell.x * this.tileSize,
                this.highlightCell.y * this.tileSize,
                this.tileSize,
                this.tileSize
            );
            ctx.restore();
        }
    }
    drawSprites(ctx: CanvasRenderingContext2D) {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const spriteName = this.grid[y][x];
                if (spriteName) {
                    this.aseprite.drawSprite(
                        ctx,
                        spriteName,
                        x * this.tileSize,
                        y * this.tileSize,
                        this.tileSize,
                        this.tileSize
                    );
                }
            }
        }
    }
    render(ctx: CanvasRenderingContext2D) {
        this.drawSprites(ctx);
        this.drawHighlight(ctx);
        this.drawGrid(ctx);
    }
}
