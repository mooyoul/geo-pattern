import { expect } from "chai";

import { Seed } from "../src/seed";

describe(Seed.name, () => {
  let seed: Seed;

  beforeEach(() => {
    seed = new Seed("1234567890abcdef1234567890abcdef12345678");
  });

  describe("read", () => {
    context("when range is valid", () => {
      it("should return seed value", () => {
        expect(seed.read(2, 2)).to.eq(0x34);
      });
    });
    context("when range is invalid", () => {
      it("should return NaN", () => {
        const value = seed.read(200, 2);
        expect(Number.isNaN(value)).to.eq(true);
      });
    });
  });
});
