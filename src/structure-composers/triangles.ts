import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class TrianglesComposer extends StructureComposer {
  public readonly name = "triangles";

  private readonly scale: number;
  private readonly sideLength: number;
  private readonly triangleHeight: number;
  private readonly triangle: string;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.scale = this.seed.read(0, 1);
    this.sideLength = this.map(this.scale, 0, 15, 15, 80);
    this.triangleHeight = this.sideLength / 2 * Math.sqrt(3);
    this.triangle = this.buildTriangleShape(this.sideLength, this.triangleHeight);

    this.width = this.sideLength * 3;
    this.height = this.triangleHeight * 6;
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
          "fill-opacity": opacity,
          stroke: this.preset.stroke.color,
          "stroke-opacity": this.preset.stroke.opacity,
        };

        const rotation = (() => {
          if (y % 2 === 0) {
            return x % 2 === 0 ? 180 : 0;
          } else {
            return x % 2 !== 0 ? 180 : 0;
          }
        })();

        nodes.push(
          new SVGNode("polyline", {
            points: this.triangle,
            ...styles,
            transform: this.buildTransform([
              { translate: [x * this.sideLength * 0.5 - this.sideLength / 2, this.triangleHeight * y] },
              { rotate: [rotation, this.sideLength / 2, this.triangleHeight / 2] },
            ]),
          }),
        );

        // Add an extra one at top-right, for tiling.
        if (x === 0) {
          nodes.push(
            new SVGNode("polyline", {
              points: this.triangle,
              ...styles,
              transform: this.buildTransform([
                { translate: [6 * this.sideLength * 0.5 - this.sideLength / 2, this.triangleHeight * y] },
                { rotate: [rotation, this.sideLength / 2, this.triangleHeight / 2] },
              ]),
            }),
          );
        }

        i++;
      }
    }

    return nodes;
  }

  private buildTriangleShape(sideLength: number, height: number): string {
    const halfWidth = sideLength / 2;

    return [
      halfWidth, 0,
      sideLength, height,
      0, height,
      halfWidth, 0,
    ].join(",");
  }
}
