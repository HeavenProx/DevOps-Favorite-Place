import { getDistance } from "./getDistance";

describe("getDistance", () => {
  it("retourne 0 pour deux points identiques", () => {
    expect(getDistance(48.8566, 2.3522, 48.8566, 2.3522)).toBe(0);
  });

  it("calcule ~111 km entre deux points à 1° de latitude d'écart", () => {
    const dist = getDistance(0, 0, 1, 0);
    expect(dist).toBeCloseTo(111.19, 0);
  });

  it("calcule la distance Paris → Londres (~341 km)", () => {
    const dist = getDistance(48.8566, 2.3522, 51.5074, -0.1278);
    expect(dist).toBeGreaterThan(330);
    expect(dist).toBeLessThan(350);
  });

  it("est symétrique (A→B == B→A)", () => {
    const d1 = getDistance(48.8566, 2.3522, 51.5074, -0.1278);
    const d2 = getDistance(51.5074, -0.1278, 48.8566, 2.3522);
    expect(d1).toBeCloseTo(d2, 5);
  });
});