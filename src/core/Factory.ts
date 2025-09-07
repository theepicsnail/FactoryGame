import { Aseprite } from "../assets/Aseprite";
import { Engine } from "../core/Engine";
import { Tile } from "../entities/tiles/Tile";
import { BeltTile } from "../entities/tiles/BeltTile";
import { EmptyTile } from "../entities/tiles/EmptyTile";
import { LeftTurnTile } from "../entities/tiles/LeftTurnTile";
import { Product } from "../entities/Product";
export class Factory {
    gridSize: number;
    tileSize: number;
    canvasSize: number;
    aseprite: Aseprite;
    grid: Tile[][];
    highlightCell: { x: number; y: number } | null = null;

    constructor(gridSize: number, canvasSize: number, aseprite: Aseprite) {
        this.gridSize = gridSize;
        this.canvasSize = canvasSize;
        this.tileSize = canvasSize / gridSize;
        this.aseprite = aseprite;
        // Example: fill grid with EmptyTiles
        this.grid = [
            [
                new LeftTurnTile('down'),
                new BeltTile('left'),
                new BeltTile('left'),
                new BeltTile('left'),
                new BeltTile('left'),
                new BeltTile('left'),
                new LeftTurnTile('left')
            ],
            [
                new BeltTile('down'),
                new BeltTile('right'),
                new EmptyTile(),
                new BeltTile('left'),
                new EmptyTile(),
                new EmptyTile(),
                new BeltTile('up')
            ],
            [
                new BeltTile('down'),
                new EmptyTile(),
                new BeltTile('down'),
                new EmptyTile(),
                new EmptyTile(),
                new EmptyTile(),
                new BeltTile('up')
            ],
            [
                new BeltTile('down'),
                new EmptyTile(),
                new EmptyTile(),
                new LeftTurnTile('down'),
                new BeltTile('left'),
                new BeltTile('left'),
                new BeltTile('up')
            ],
            [
                new BeltTile('down'),
                new EmptyTile(),
                new BeltTile('left'),
                new BeltTile('left'),
                new BeltTile('left'),
                new BeltTile('left'),
                new BeltTile('up')
            ],
            [
                new BeltTile('down'),
                new EmptyTile(),
                new EmptyTile(),
                new EmptyTile(),
                new EmptyTile(),
                new EmptyTile(),
                new BeltTile('up')
            ],
            [
                new LeftTurnTile('right'),
                new BeltTile('right'),
                new BeltTile('up'),
                new BeltTile('right'),
                new BeltTile('right'),
                new BeltTile('right'),
                new LeftTurnTile('up')
            ],

        ];

        this.grid[3][4].product = new Product();
        this.grid[4][5].product = new Product();


        this.grid[1][0].product = new Product();
        this.grid[0][1].product = new Product();
        
        // TEST: Add a product to a visible belt tile for animation
        // Place on the second tile in the top row (row 0, col 1)
        const testBelt = this.grid[6][3];
        if (testBelt instanceof BeltTile) {
            testBelt.product = new Product();
            //testBelt.slideProgress = 1;
        }
    }


    /**
     * Returns the tile at (row, col) or undefined if out of bounds.
     */
    getTile(row: number, col: number): Tile | undefined {
        if (row < 0 || row >= this.grid.length) return undefined;
        if (col < 0 || col >= this.grid[0].length) return undefined;
        return this.grid[row][col];
    }

    setHighlightCell(cell: { x: number; y: number } | null) {
        this.highlightCell = cell;
    }

    update() {
        // Phase 1: plan
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                this.grid[y][x].plan(this, y, x);
            }
        }
        // Phase 2: apply
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                this.grid[y][x].apply(this, y, x);
            }
        }
    }

    // Render only the tile backgrounds (belts, etc)
    renderTiles(ctx: CanvasRenderingContext2D) {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                this.grid[y][x].render(ctx, this, y, x);
            }
        }
        // Optionally, draw highlight overlay
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

    // Render all products on the product layer
    renderProducts(ctx: CanvasRenderingContext2D) {
        // Products are now rendered within the tile's render method, so this loop is no longer needed.
    }
}
