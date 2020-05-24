import { expect } from "chai";

import { defaultStore } from "../src/pattern-store";

describe("PatternStore", () => {
  describe("defaultStore", () => {
    it("should be instanceof Map", () => {
      expect(defaultStore).to.be.instanceOf(Map);
    });
  });
});

