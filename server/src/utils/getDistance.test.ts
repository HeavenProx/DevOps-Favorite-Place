import { getDistance } from "./getDistance";

describe("getDistance", () => {
  it("retourne 0 pour deux points identiques", () => {
    const point = { lat: 48.8566, lng: 2.3522 };
    expect(getDistance(point, point)).toBeCloseTo(0);
  });

  it("calcule la distance Paris → Lyon (~392 km)", () => {
    const paris = { lat: 48.8566, lng: 2.3522 };
    const lyon = { lat: 45.764, lng: 4.8357 };
    const dist = getDistance(paris, lyon);
    expect(dist).toBeGreaterThan(380);
    expect(dist).toBeLessThan(400);
  });

  it("calcule la distance Paris → Londres (~341 km)", () => {
    const paris = { lat: 48.8566, lng: 2.3522 };
    const london = { lat: 51.5074, lng: -0.1278 };
    const dist = getDistance(paris, london);
    expect(dist).toBeGreaterThan(330);
    expect(dist).toBeLessThan(350);
  });

  it("est symétrique (A→B == B→A)", () => {
    const paris = { lat: 48.8566, lng: 2.3522 };
    const london = { lat: 51.5074, lng: -0.1278 };
    const d1 = getDistance(paris, london);
    const d2 = getDistance(london, paris);
    expect(d1).toBeCloseTo(d2, 5);
  });
});