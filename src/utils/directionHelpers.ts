// Direction helpers for tile logic

export type Direction = "up" | "down" | "left" | "right";

export function directionDelta(dir: Direction): [number, number] {
    switch (dir) {
        case "up": return [-1, 0];
        case "down": return [1, 0];
        case "left": return [0, -1];
        case "right": return [0, 1];
    }
    return [0,0]; // Should not happen
}

export function oppositeDirection(dir: Direction): Direction {
    switch (dir) {
        case "up": return "down";
        case "down": return "up";
        case "left": return "right";
        case "right": return "left";
    }
}

export function inputDir(outputDir: Direction): Direction {
    switch (outputDir) {
        case "up": return "right";
        case "right": return "down";
        case "down": return "left";
        case "left": return "up";
    }
}
