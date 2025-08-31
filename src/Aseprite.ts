// src/Aseprite.ts
// Loads an Aseprite JSON and PNG, and provides a drawSprite method by name

export type AsepriteSpriteBounds = {
  x: number;
  y: number;
  w: number;
  h: number;
};

export class Aseprite {
  private image: HTMLImageElement;
  private spriteMap: Map<string, AsepriteSpriteBounds> = new Map();
  private loaded: boolean = false;

  constructor(jsonUrl: string, imageUrl: string, onLoad?: () => void) {
    this.image = new Image();
    this.image.src = imageUrl;
    Promise.all([
      fetch(jsonUrl).then(r => r.json()),
      new Promise<void>(resolve => {
        this.image.onload = () => resolve();
      })
    ]).then(([json]) => {
      // Parse slices for named sprites
      if (json.meta && json.meta.slices) {
        for (const slice of json.meta.slices) {
          const name = slice.name;
          const bounds = slice.keys[0].bounds;
          this.spriteMap.set(name, bounds);
        }
      }
      this.loaded = true;
      if (onLoad) onLoad();
    });
  }

  isLoaded() {
    return this.loaded;
  }

  drawSprite(ctx: CanvasRenderingContext2D, name: string, dx: number, dy: number, dw: number, dh: number) {
    const bounds = this.spriteMap.get(name);
    if (!bounds || !this.loaded) return;
    // Round all coordinates and sizes to integers to avoid sampling errors
    const sx = Math.round(bounds.x);
    const sy = Math.round(bounds.y);
    const sw = Math.round(bounds.w);
    const sh = Math.round(bounds.h);
    const ddx = Math.round(dx);
    const ddy = Math.round(dy);
    const ddw = Math.round(dw);
    const ddh = Math.round(dh);
    ctx.drawImage(
      this.image,
      sx, sy, sw, sh,
      ddx, ddy, ddw, ddh
    );
  }
}
