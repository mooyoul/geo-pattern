import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode, SVGNodeAttribute } from "../svg";

import { StructureComposer } from "./base";

export class MosaicSquaresComposer extends StructureComposer {
  public readonly name = "mosaic-squares";

  private readonly triangleSize: number;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.triangleSize = this.map(this.seed.read(0, 1), 0, 15, 15, 50);

    this.width = this.height = this.triangleSize * 8;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    let i = 0;
    for (let y = 0; y <= 3; y++) {
      for (let x = 0 ; x <= 3; x++) {
        if (x % 2 === 0) {
          if (y % 2 === 0) {
            this.drawOuterMosaicTitle(
              nodes,
              x * this.triangleSize * 2,
              y * this.triangleSize * 2,
              this.triangleSize,
              this.seed.read(i, 1),
            );
          } else {
            this.drawInnerMosaicTitle(
              nodes,
              x * this.triangleSize * 2,
              y * this.triangleSize * 2,
              this.triangleSize,
              [this.seed.read(i, 1), this.seed.read(i + 1, 1)],
            );
          }
        } else {
          if (y % 2 === 0) {
            this.drawInnerMosaicTitle(
              nodes,
              x * this.triangleSize * 2,
              y * this.triangleSize * 2,
              this.triangleSize,
              [this.seed.read(i, 1), this.seed.read(i + 1, 1)],
            );
          } else {
            this.drawOuterMosaicTitle(
              nodes,
              x * this.triangleSize * 2,
              y * this.triangleSize * 2,
              this.triangleSize,
              this.seed.read(i, 1),
            );
          }
        }

        i++;
      }
    }

    return nodes;
  }

  private drawInnerMosaicTitle(nodes: SVGNode[], x: number, y: number, triangleSize: number, values: number[]) {
    let opacity: number;
    let fill: string;
    let styles: SVGNodeAttribute;

    opacity = this.opacity(values[0]);
    fill = this.fillColor(values[0]);
    styles = {
      stroke: this.preset.stroke.color,
      "stroke-opacity": this.preset.stroke.opacity,
      "fill-opacity": opacity,
      fill,
    };

    nodes.push(
      this.buildRightTriangleShape(triangleSize, {
        ...styles,
        transform: this.buildTransform([
          { translate: [x + triangleSize, y] },
          { scale: [-1, 1] },
        ]),
      }),
      this.buildRightTriangleShape(triangleSize, {
        ...styles,
        transform: this.buildTransform([
          { translate: [x + triangleSize, y + triangleSize * 2] },
          { scale: [1, -1] },
        ]),
      }),
    );

    opacity = this.opacity(values[1]);
    fill = this.fillColor(values[1]);
    styles = {
      stroke: this.preset.stroke.color,
      "stroke-opacity": this.preset.stroke.opacity,
      "fill-opacity": opacity,
      fill,
    };

    nodes.push(
      this.buildRightTriangleShape(triangleSize, {
        ...styles,
        transform: this.buildTransform([
          { translate: [x + triangleSize, y + triangleSize * 2] },
          { scale: [-1, -1] },
        ]),
      }),
      this.buildRightTriangleShape(triangleSize, {
        ...styles,
        transform: this.buildTransform([
          { translate: [x + triangleSize, y] },
          { scale: [1, 1] },
        ]),
      }),
    );
  }

  private drawOuterMosaicTitle(nodes: SVGNode[], x: number, y: number, triangleSize: number, value: number) {
    const opacity = this.opacity(value);
    const fill = this.fillColor(value);
    const styles = {
      stroke: this.preset.stroke.color,
      "stroke-opacity": this.preset.stroke.opacity,
      "fill-opacity": opacity,
      fill,
    };

    nodes.push(
      this.buildRightTriangleShape(triangleSize, {
        ...styles,
        transform: this.buildTransform([
          { translate: [x, y + triangleSize] },
          { scale: [1, -1] },
        ]),
      }),
      this.buildRightTriangleShape(triangleSize, {
        ...styles,
        transform: this.buildTransform([
          { translate: [x + triangleSize * 2, y + triangleSize] },
          { scale: [-1, -1] },
        ]),
      }),
      this.buildRightTriangleShape(triangleSize, {
        ...styles,
        transform: this.buildTransform([
          { translate: [x, y + triangleSize] },
          { scale: [1, 1] },
        ]),
      }),
      this.buildRightTriangleShape(triangleSize, {
        ...styles,
        transform: this.buildTransform([
          { translate: [x + triangleSize * 2, y + triangleSize] },
          { scale: [-1, 1] },
        ]),
      }),
    );
  }

  private buildRightTriangleShape(sideLength: number, attrs: SVGNodeAttribute): SVGNode {
    const points = [
      0, 0,
      sideLength, sideLength,
      0, sideLength,
      0, 0,
    ].join(",");

    return new SVGNode("polyline", {
      points,
      ...attrs,
    });
  }
}
