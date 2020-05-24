import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class PlaidComposer extends StructureComposer {
  public readonly name = "plaid";

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    let height = 0;
    let width = 0;

    // horizontal stripes
    for (let i = 0 ; i < 18 * 2 ; i += 2) {
      const space = this.seed.read(i, 1);
      height += space + 5;

      const value = this.seed.read(i + 1, 1);
      const opacity = this.opacity(value);
      const fill = this.fillColor(value);
      const stripeHeight = value + 5;

      nodes.push(
        new SVGNode("rect", {
          x: 0,
          y: height,
          width: "100%",
          height: stripeHeight,
          opacity,
          fill,
        }),
      );

      height += stripeHeight;
    }

    // vertical stripes
    for (let i = 0 ; i < 18 * 2 ; i += 2) {
      const space = this.seed.read(i, 1);
      width += space + 5;

      const value = this.seed.read(i + 1, 1);
      const opacity = this.opacity(value);
      const fill = this.fillColor(value);
      const stripeWidth = value + 5;

      nodes.push(
        new SVGNode("rect", {
          x: width,
          y: 0,
          width: stripeWidth,
          height: "100%",
          opacity,
          fill,
        }),
      );

      width += stripeWidth;
    }

    this.width = width;
    this.height = height;

    return nodes;
  }
}
