import { describe, it, expect } from "vitest";
import { products, stores } from "../data/catalog";
import { filterProducts } from "./catalog";
describe("demo catalog", () => {
  it("links every product to an existing store and valid local images", () => {
    for (const p of products) {
      expect(stores.some((s) => s.id === p.storeId)).toBe(true);
      expect(p.images.length).toBeGreaterThan(0);
      expect(p.stock).toBeGreaterThanOrEqual(0);
      expect(p.price).toBeGreaterThan(0);
    }
  });
  it("searches by store name and trims input", () => {
    expect(filterProducts("  الفردوس  ").map((p) => p.storeId)).toEqual([
      "firdaws",
      "firdaws",
    ]);
  });
  it("combines category and store filters without leaking other stores", () => {
    expect(filterProducts("", "beauty", "firdaws")).toEqual([]);
    expect(
      filterProducts("", "phones", "firdaws").every(
        (p) => p.storeId === "firdaws",
      ),
    ).toBe(true);
  });
  it("handles empty results", () => {
    expect(filterProducts("غيرموجود")).toEqual([]);
  });
  it("uses unique route identifiers", () => {
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
    expect(new Set(stores.map((s) => s.id)).size).toBe(stores.length);
  });
});
