import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class ChevronsComposer extends StructureComposer {
  public readonly name = "chevrons";

  private readonly chevron: {
    width: number;
    height: number;
  };
  private readonly shape: SVGNode[];

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.chevron = {
      width: this.map(this.seed.read(0, 1), 0, 15, 30, 80),
      height: this.map(this.seed.read(0, 1), 0, 15, 30, 80),
    };

    this.shape = this.buildChevronShape(this.chevron.width, this.chevron.height);
    this.width  = this.chevron.width * 6;
    this.height = this.chevron.height * 6 * 0.66;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        const value = this.seed.read(i, 1);
        const styles = {
          'stroke':  this.preset.stroke.color,
          'stroke-opacity': this.preset.stroke.opacity,
          'fill': this.fillColor(value),
          'fill-opacity': this.opacity(value),
          'stroke-width': 1,
        };

        nodes.push(
          new SVGNode("g", {
            ...styles,
            transform: this.buildTransform([
              { translate: [x * this.chevron.width, y * this.chevron.height * 0.66 - this.chevron.height / 2] },
            ]),
          }, this.shape),
        );

        // Add an extra row at the end that matches the first row, for tiling.
        if (y === 0) {
          nodes.push(
            new SVGNode("g", {
              ...styles,
              transform: this.buildTransform([
                { translate: [x * this.chevron.width, 6 * this.chevron.height * 0.66 - this.chevron.height / 2] },
              ]),
            }, this.shape),
          );
        }

        i++;
      }
    }

    return nodes;
  }

  private buildChevronShape(width: number, height: number): SVGNode[] {
    const e = height * 0.66;

    return [
      new SVGNode("polyline", {
        points: [
          0, 0,
          width / 2, height - e,
          width / 2, height,
          0, e,
          0,0,
        ].join(","),
      }),
      new SVGNode("polyline", {
        points: [
          width / 2, height - e,
          width, 0,
          width, e,
          width / 2, height,
          width / 2, height - e,
        ].join(","),
      }),
    ];
  }
}
