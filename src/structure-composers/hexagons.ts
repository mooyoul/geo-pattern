import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class HexagonsComposer extends StructureComposer {
  public readonly name = "hexagons";

  private readonly scale: number;
  private readonly sideLength: number;
  private readonly hexagon: {
    width: number;
    height: number;
  };

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.scale = this.seed.read(0, 1);
    this.sideLength = this.map(this.scale, 0, 15, 8 , 60);
    this.hexagon = {
      width: this.sideLength * 2,
      height: this.sideLength * Math.sqrt(3),
    };

    this.width  = this.hexagon.width * 3 + this.sideLength * 3;
    this.height = this.hexagon.height * 6;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    const points = (() => {
      const c = this.sideLength;
      const a = c / 2;
      const b = Math.sin(60 * Math.PI / 180) * c;

      return [
        0, b,
        a, 0,
        a + c, 0,
        2 * c, b,
        a + c,2 * b,
        a, 2 * b,
        0, b,
      ].join(",");
    })();

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        const value = this.seed.read(i, 1);
        let dy = x % 2 === 0 ? y * this.hexagon.height : y * this.hexagon.height + this.hexagon.height / 2;
        const opacity = this.opacity(value);
        const fill = this.fillColor(value);

        const styles = {
          fill,
          "fill-opacity": opacity,
          stroke: this.preset.stroke.color,
          "stroke-opacity": this.preset.stroke.opacity,
        };

        nodes.push(
          new SVGNode("polyline", {
            points,
            ...styles,
            transform: this.buildTransform([{
              translate: [
                x * this.sideLength * 1.5 - this.hexagon.width / 2,
                dy - this.hexagon.height / 2,
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
                  6 * this.sideLength * 1.5 - this.hexagon.width / 2,
                  dy - this.hexagon.height / 2,
                ],
              }]),
            }),
          );
        }

        // Add an extra row at the end that matches the first row, for tiling.
        if (y === 0) {
          dy = x % 2 === 0 ?
            6 * this.hexagon.height :
            6 * this.hexagon.height + this.hexagon.height / 2;

          nodes.push(
            new SVGNode("polyline", {
              points,
              ...styles,
              transform: this.buildTransform([{
                translate: [
                  x * this.sideLength * 1.5 - this.hexagon.width / 2,
                  dy - this.hexagon.height / 2,
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
                  6 * this.sideLength * 1.5 - this.hexagon.width / 2,
                  5 * this.hexagon.height + this.hexagon.height / 2,
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
