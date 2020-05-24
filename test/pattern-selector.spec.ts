import { expect } from "chai";

import { createFakeSeed } from "./helper";

import { PatternSelector } from "../src/pattern-selector";
import { Seed } from "../src/seed";


describe(PatternSelector.name, () => {
  let selector: PatternSelector;

  let seed: Seed;
  beforeEach(() => {
    seed = createFakeSeed([
      { args: [20, 1], value: 2 },
    ]);
  });

  describe("#select", () => {
    context("when given pattern did not match anything", () => {
      beforeEach(() => {
        selector = new PatternSelector(["one", "two"], seed, new Map([
          ["foo", "FooConstructor" as any],
          ["bar", "BarConstructor" as any],
          ["baz", "BazConstructor" as any],
        ]));
      });

      it("should use all patterns", () => {
        expect(selector.select()).to.eq("BazConstructor");
      });
    });

    context("when given index exceeds pattern range", () => {
      beforeEach(() => {
        selector = new PatternSelector(["foo", "wut"], seed, new Map([
          ["foo", "FooConstructor" as any],
          ["bar", "BarConstructor" as any],
          ["baz", "BazConstructor" as any],
        ]));
      });

      it("should pick last one", () => {
        expect(selector.select()).to.eq("FooConstructor");
      });
    });
  });
});
