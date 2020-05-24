import { expect } from "chai";
import { Pattern } from "../src/pattern";
import { SVGNode } from "../src/svg";

describe(Pattern.name, () => {
  let pattern: Pattern;
  beforeEach(() => {
    pattern = new Pattern();
  });

  describe("#toSVG", () => {
    context("with basic fields", () => {
      it("should return SVG string", () => {
        expect(pattern.toSVG()).to.eq(`<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100"></svg>`);
      });
    });

    context("with background", () => {
      beforeEach(() => {
        pattern.width = 123;
        pattern.height = 456;
        pattern.background = {
          image: [new SVGNode("rect", { x: 0, y: 0, width: "100%", height: 60 })],
        } as any;
      });

      it("should return SVG string", () => {
        expect(pattern.toSVG()).to.eq(`<svg xmlns="http://www.w3.org/2000/svg" width="123" height="456"><rect x="0" y="0" width="100%" height="60"></rect></svg>`);
      });
    });

    context("with all fields", () => {
      beforeEach(() => {
        pattern.width = 111;
        pattern.height = 222;
        pattern.background = {
          image: [new SVGNode("rect", { x: 0, y: 0, width: "100%", height: 60 })],
        } as any;
        pattern.structure = {
          image: [new SVGNode("circle", { cx: 0, cy: 0, r: 1 })],
        } as any;
      });

      it("should return SVG string", () => {
        expect(pattern.toSVG()).to.eq(`<svg xmlns="http://www.w3.org/2000/svg" width="111" height="222"><rect x="0" y="0" width="100%" height="60"></rect><circle cx="0" cy="0" r="1"></circle></svg>`);
      });
    });
  });
});
