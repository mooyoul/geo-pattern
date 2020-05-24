import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class XesComposer extends StructureComposer {
  public readonly name = "xes";

  private readonly squareSize: number;
  private readonly xShape: SVGNode[];
  private readonly xSize: number;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.squareSize = this.map(this.seed.read(0, 1), 0, 15, 10, 25);
    this.xShape = this.buildPlusShape(this.squareSize); // rotated later
    this.xSize = this.squareSize * 3 * 0.943;

    this.width = this.height = this.xSize * 3;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        const value = this.seed.read(i, 1);
        const opacity = this.opacity(value);
        let dy = x % 2 === 0 ?
          y * this.xSize - this.xSize * 0.5 :
          y * this.xSize - this.xSize * 0.5 + this.xSize / 4;
        const fill = this.fillColor(value);

        const styles = {
          fill,
          style: `opacity: ${opacity}`,
        };

        nodes.push(
          new SVGNode("g", {
            ...styles,
            transform: this.buildTransform([
              { translate: [x * this.xSize / 2 - this.xSize / 2, dy - y * this.xSize / 2] },
              { rotate: [45, this.xSize / 2, this.xSize / 2] },
            ]),
          }, this.xShape),
        );

        // Add an extra column on the right for tiling.
        if (x === 0) {
          nodes.push(
            new SVGNode("g", {
              ...styles,
              transform: this.buildTransform([
                { translate: [6 * this.xSize / 2 - this.xSize / 2, dy - y * this.xSize / 2] },
                { rotate: [45, this.xSize / 2, this.xSize / 2] },
              ]),
            }, this.xShape),
          );
        }

        // Add an extra row on the bottom that matches the first row, for tiling.
        if (y === 0) {
          dy = x % 2 === 0 ?
            6 * this.xSize - this.xSize / 2 :
            6 * this.xSize - this.xSize / 2 + this.xSize / 4;

          nodes.push(
            new SVGNode("g", {
              ...styles,
              transform: this.buildTransform([
                { translate: [x * this.xSize / 2 - this.xSize / 2, dy - 6 * this.xSize / 2] },
                { rotate: [45, this.xSize / 2, this.xSize / 2] },
              ]),
            }, this.xShape),
          );
        }

        // These can hang off the bottom, so put a row at the top for tiling.
        if (y === 5) {
          nodes.push(
            new SVGNode("g", {
              ...styles,
              transform: this.buildTransform([
                { translate: [x * this.xSize / 2 - this.xSize / 2, dy - 11 * this.xSize / 2] },
                { rotate: [45, this.xSize / 2, this.xSize / 2] },
              ]),
            }, this.xShape),
          );
        }

        // Add an extra one at top-right and bottom-right, for tiling.
        if (x === 0 && y === 0) {
          nodes.push(
            new SVGNode("g", {
              ...styles,
              transform: this.buildTransform([
                { translate: [6 * this.xSize / 2 - this.xSize / 2, dy - 6 * this.xSize / 2] },
                { rotate: [45, this.xSize / 2, this.xSize / 2] },
              ]),
            }, this.xShape),
          );
        }

        i++;
      }
    }

    return nodes;
  }
}
