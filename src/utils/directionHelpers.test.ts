import { directionDelta, oppositeDirection } from "./directionHelpers";

describe('directionDelta', () => {
  it('should return the correct delta for up', () => {
    expect(directionDelta('up')).toEqual([-1, 0]);
  });

  it('should return the correct delta for down', () => {
    expect(directionDelta('down')).toEqual([1, 0]);
  });

  it('should return the correct delta for left', () => {
    expect(directionDelta('left')).toEqual([0, -1]);
  });

  it('should return the correct delta for right', () => {
    expect(directionDelta('right')).toEqual([0, 1]);
  });
});

describe('oppositeDirection', () => {
  it('should return the opposite direction for up', () => {
    expect(oppositeDirection('up')).toBe('down');
  });

  it('should return the opposite direction for down', () => {
    expect(oppositeDirection('down')).toBe('up');
  });

  it('should return the opposite direction for left', () => {
    expect(oppositeDirection('left')).toBe('right');
  });

  it('should return the opposite direction for right', () => {
    expect(oppositeDirection('right')).toBe('left');
  });
});
