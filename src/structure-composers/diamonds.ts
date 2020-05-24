import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class DiamondsComposer extends StructureComposer {
  public readonly name = "diamonds";

  private readonly diamond: {
    width: number;
    height: number;
  };

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.diamond = {
      width: this.map(this.seed.read(0, 1), 0, 15, 10, 50),
      height: this.map(this.seed.read(1, 1), 0, 15, 10, 50),
    };

    this.width  = this.diamond.width * 6;
    this.height = this.diamond.height * 3;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    const points = [
      this.diamond.width / 2, 0,
      this.diamond.width, this.diamond.height / 2,
      this.diamond.width / 2, this.diamond.height,
      0, this.diamond.height / 2,
    ].join(",");

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        const value = this.seed.read(i, 1);
        const opacity = this.opacity(value);
        const fill = this.fillColor(value);

        const styles = {
          fill,
          "fill-opacity": opacity,
          stroke: this.preset.stroke.color,
          "stroke-opacity": this.preset.stroke.opacity,
        };

        const dx = (y % 2 === 0) ? 0 : this.diamond.width / 2;

        nodes.push(
          new SVGNode("polyline", {
            points,
            ...styles,
            transform: this.buildTransform([{
              translate: [
                x * this.diamond.width - this.diamond.width / 2 + dx,
                this.diamond.height / 2 * y - this.diamond.height / 2,
              ],
            }]),
          }),
        );

        // Add an extra one at top-right, for tiling.
        if (x === 0) {
          nodes.push(
            new SVGNode("polyline", {
              points,
              ...styles,
              transform: this.buildTransform([{
                translate: [
                  6 * this.diamond.width - this.diamond.width / 2 + dx,
                  this.diamond.height / 2 * y - this.diamond.height / 2,
                ],
              }]),
            }),
          );
        }

        // Add an extra row at the end that matches the first row, for tiling.
        if (y === 0) {
          nodes.push(
            new SVGNode("polyline", {
              points,
              ...styles,
              transform: this.buildTransform([{
                translate: [
                  x * this.diamond.width - this.diamond.width / 2 + dx,
                  this.diamond.height / 2 * 6 - this.diamond.height / 2,
                ],
              }]),
            }),
          );
        }

        // Add an extra one at bottom-right, for tiling.
        if (x === 0 && y === 0) {
          nodes.push(
            new SVGNode("polyline", {
              points,
              ...styles,
              transform: this.buildTransform([{
                translate: [
                  6 * this.diamond.width - this.diamond.width / 2 + dx,
                  this.diamond.height / 2 * 6 - this.diamond.height / 2,
                ],
              }]),
            }),
          );
        }

        i++;
      }
    }

    return nodes;
  }
}
