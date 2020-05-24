import { expect } from "chai";

import { PatternValidator } from "../src/pattern-validator";

describe(PatternValidator.name, () => {
  let validator: PatternValidator;

  beforeEach(() => {
    validator = new PatternValidator(new Map([
      ["foo", "foo" as any],
    ]));
  });

  describe("#validate", () => {
    context("when store does have some given pattern", () => {
      it("should throw TypeError", () => {
        expect(() => validator.validate(["wut"])).to.throw(TypeError);
        expect(() => validator.validate(["foo", "wut"])).to.throw(TypeError);
      });
    });

    context("when store has given patterns", () => {
      it("should not throw TypeError", () => {
        expect(() => validator.validate(["foo"])).not.to.throw(TypeError);
      });
    });
  });
});
