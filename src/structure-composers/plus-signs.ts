import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class PlusSignsComposer extends StructureComposer {
  public readonly name = "plus-signs";

  private readonly squareSize: number;
  private readonly plusSize: number;
  private readonly shape: SVGNode[];

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.squareSize = this.map(this.seed.read(0, 1), 0, 15, 10, 25);
    this.plusSize = this.squareSize * 3;
    this.shape = this.buildPlusShape(this.squareSize);

    this.width = this.height = this.squareSize * 12;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        const value = this.seed.read(i, 1);
        const opacity = this.opacity(value);
        const fill = this.fillColor(value);
        const dx = y % 2;

        const styles = {
          fill,
          stroke: this.preset.stroke.color,
          "stroke-opacity": this.preset.stroke.opacity,
          style: `fill-opacity: ${opacity}`,
        };

        nodes.push(
          new SVGNode("g", {
            ...styles,
            transform: this.buildTransform([{
              translate: [
                x * this.plusSize - x * this.squareSize + dx * this.squareSize - this.squareSize,
                y * this.plusSize - y * this.squareSize - this.plusSize / 2,
              ],
            }]),
          }, this.shape),
        );

        // Add an extra column on the right for tiling.
        if (x === 0) {
          nodes.push(
            new SVGNode("g", {
              ...styles,
              transform: this.buildTransform([{
                translate: [
                  4 * this.plusSize - x * this.squareSize + dx * this.squareSize - this.squareSize,
                  y * this.plusSize - y * this.squareSize - this.plusSize / 2,
                ],
              }]),
            }, this.shape),
          );
        }

        // Add an extra row on the bottom that matches the first row, for tiling.
        if (y === 0) {
          nodes.push(
            new SVGNode("g", {
              ...styles,
              transform: this.buildTransform([{
                translate: [
                  x * this.plusSize - x * this.squareSize + dx * this.squareSize - this.squareSize,
                  4 * this.plusSize - y * this.squareSize - this.plusSize / 2,
                ],
              }]),
            }, this.shape),
          );
        }

        // Add an extra one at top-right and bottom-right, for tiling.
        if (x === 0 && y === 0) {
          nodes.push(
            new SVGNode("g", {
              ...styles,
              transform: this.buildTransform([{
                translate: [
                  4 * this.plusSize - x * this.squareSize + dx * this.squareSize - this.squareSize,
                  4 * this.plusSize - y * this.squareSize - this.plusSize / 2,
                ],
              }]),
            }, this.shape),
          );
        }

        i++;
      }
    }

    return nodes;
  }
}
