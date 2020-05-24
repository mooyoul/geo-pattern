import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class OverlappingRingsComposer extends StructureComposer {
  public readonly name = "overlapping-rings";

  private readonly scale: number;
  private readonly ringSize: number;
  private readonly strokeWidth: number;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.scale = this.seed.read(0, 1);
    this.ringSize = this.map(this.scale, 0, 15, 10, 60);
    this.strokeWidth = this.ringSize / 4;

    this.width = this.height = this.ringSize * 6;
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
          fill: "none",
          stroke: fill,
          style: `opacity: ${opacity}; stroke-width: ${this.strokeWidth}px`,
        };

        nodes.push(
          new SVGNode("circle", {
            cx: x * this.ringSize,
            cy: y * this.ringSize,
            r: this.ringSize - this.strokeWidth / 2,
            ...styles,
          }),
        );

        // Add an extra one at top-right, for tiling.
        if (x === 0) {
          nodes.push(
            new SVGNode("circle", {
              cx: 6 * this.ringSize,
              cy: y * this.ringSize,
              r: this.ringSize - this.strokeWidth / 2,
              ...styles,
            }),
          );
        }

        if (y === 0) {
          nodes.push(
            new SVGNode("circle", {
              cx: x * this.ringSize,
              cy: 6 * this.ringSize,
              r: this.ringSize - this.strokeWidth / 2,
              ...styles,
            }),
          );
        }

        if (x === 0 && y === 0) {
          nodes.push(
            new SVGNode("circle", {
              cx: 6 * this.ringSize,
              cy: 6 * this.ringSize,
              r: this.ringSize - this.strokeWidth / 2,
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
