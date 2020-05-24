import { expect } from "chai";

import { SVGNode } from "../src/svg";

describe(SVGNode.name, () => {
  let node: SVGNode;

  beforeEach(() =>{
    node = new SVGNode("svg", { width: 123, height: "456" });
  });

  describe("#appendChild", () => {
    it("should append child", () => {
      const child = new SVGNode("rect", { x: 0, y: 0, width: 2, height: 2} );

      node.appendChild(child);

      expect(node.childNode[0]).to.eq(child);
    });
  });

  describe("#toXML", () => {
    context("without children", () => {
      it("should return xml string", () => {
        expect(node.toXML()).to.eq(`<svg width="123" height="456"></svg>`);
      });
    });

    context("with children", () => {
      beforeEach(() => {
        const child = new SVGNode("rect", { x: 0, y: 0, width: 2, height: 2} );
        node.appendChild(child);
      });

      it("should return xml string", () => {
        expect(node.toXML()).to.eq(`<svg width="123" height="456"><rect x="0" y="0" width="2" height="2"></rect></svg>`);
      });
    });
  });
});
