import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class OverlappingCirclesComposer extends StructureComposer {
  public readonly name = "overlapping-circles";

  private readonly scale: number;
  private readonly diameter: number;
  private readonly radius: number;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.scale = this.seed.read(0, 1);
    this.diameter = this.map(this.scale, 0, 15, 25, 200);
    this.radius = this.diameter / 2;

    this.width = this.height = this.radius * 6;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        const value = this.seed.read(i, 1);
        const opacity = this.opacity(value);
        const fill = this.fillColor(value);

        const styles = {
          fill,
          style: `opacity: ${opacity}`,
        };

        nodes.push(
          new SVGNode("circle", {
            cx: x * this.radius,
            cy: y * this.radius,
            r: this.radius,
            ...styles,
          }),
        );

        // Add an extra one at top-right, for tiling.
        if (x === 0) {
          nodes.push(
            new SVGNode("circle", {
              cx: 6 * this.radius,
              cy: y * this.radius,
              r: this.radius,
              ...styles,
            }),
          );
        }

        // Add an extra row at the end that matches the first row, for tiling.
        if (y === 0) {
          nodes.push(
            new SVGNode("circle", {
              cx: x * this.radius,
              cy: 6 * this.radius,
              r: this.radius,
              ...styles,
            }),
          );
        }

        // Add an extra one at bottom-right, for tiling.
        if (x === 0 && y === 0) {
          nodes.push(
            new SVGNode("circle", {
              cx: 6 * this.radius,
              cy: 6 * this.radius,
              r: this.radius,
              ...styles,
            }),
          );
        }

        i++;
      }
    }

    return nodes;
  }
}
