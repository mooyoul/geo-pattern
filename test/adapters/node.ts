import { expect } from "chai";

import { adapter, NodeAdapter } from "../../src/adapters/node";

describe(NodeAdapter.name, () => {
  describe("#hash", () => {
    it("should return hash", () => {
      expect(adapter.hash("fake")).to.eq("c053ecf9ed41df0311b9df13cc6c3b6078d2d3c2");
    });
  });
});

