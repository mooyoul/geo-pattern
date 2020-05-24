import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class OctagonsComposer extends StructureComposer {
  public readonly name = "octagons";

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

    const points = (() => {
      const s = this.squareSize;
      const c = s * 0.33;

      return [
        c, 0,
        s - c, 0,
        s, c,
        s,s - c,
        s - c, s,
        c, s,
        0, s - c,
        0, c,
        c, 0,
      ].join(",");
    })();

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        const value = this.seed.read(i, 1);
        const opacity = this.opacity(value);
        const fill = this.fillColor(value);

        nodes.push(
          new SVGNode("polyline", {
            points,
            fill,
            "fill-opacity": opacity,
            stroke: this.preset.stroke.color,
            "stroke-opacity": this.preset.stroke.opacity,
            transform: this.buildTransform([
              { translate: [x * this.squareSize, y * this.squareSize] },
            ]),
          }),
        );

        i++;
      }
    }

    return nodes;
  }
}
