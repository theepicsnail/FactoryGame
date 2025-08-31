// Sprite and SpriteSheet classes
export type Sprite = {
  x: number; // sprite index x
  y: number; // sprite index y
  width: number;
  height: number;
};

export class SpriteSheet {
  image: HTMLImageElement;
  spriteWidth: number;
  spriteHeight: number;
  columns: number;
  rows: number;
  sprites: Sprite[] = [];
  constructor(image: HTMLImageElement, spriteWidth: number, spriteHeight: number, columns: number, rows: number) {
    this.image = image;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.columns = columns;
    this.rows = rows;
    this.generateSprites();
  }
  generateSprites() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.columns; x++) {
        this.sprites.push({
          x,
          y,
          width: this.spriteWidth,
          height: this.spriteHeight
        });
      }
    }
  }
  // Draw a sprite at (dx, dy) with size (dw, dh)
  drawSprite(ctx: CanvasRenderingContext2D, index: number, dx: number, dy: number, dw: number, dh: number) {
    const sprite = this.sprites[index];
    if (!sprite) return;
    ctx.drawImage(
      this.image,
      sprite.x * this.spriteWidth,
      sprite.y * this.spriteHeight,
      sprite.width,
      sprite.height,
      dx,
      dy,
      dw,
      dh
    );
  }
}
