import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class SquaresComposer extends StructureComposer {
  public readonly name = "squares";

  private readonly squareSize: number;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.squareSize = this.map(this.seed.read(0, 1), 0, 15, 10, 60);

    this.width = this.height = this.squareSize * 6;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        const value = this.seed.read(i, 1);
        const opacity = this.opacity(value);
        const fill = this.fillColor(value);

        nodes.push(
          new SVGNode("rect", {
            x: x * this.squareSize,
            y: y * this.squareSize,
            width: this.squareSize,
            height: this.squareSize,
            fill,
            "fill-opacity": opacity,
            stroke: this.preset.stroke.color,
            "stroke-opacity": this.preset.stroke.opacity,
          }),
        );

        i++;
      }
    }

    return nodes;
  }
}
