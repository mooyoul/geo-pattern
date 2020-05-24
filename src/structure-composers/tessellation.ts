import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode, SVGNodeAttribute } from "../svg";

import { StructureComposer } from "./base";

export class TessellationComposer extends StructureComposer {
  public readonly name = "tessellation";

  private readonly sideLength: number;
  private readonly hexHeight: number;
  private readonly hexWidth: number;
  private readonly triangleHeight: number;
  private readonly triangle: string;
  private readonly tileWidth: number;
  private readonly tileHeight: number;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.sideLength = this.map(this.seed.read(0, 1), 0, 15, 5, 40);
    this.hexHeight = this.sideLength * Math.sqrt(3);
    this.hexWidth = this.sideLength * 2;
    this.triangleHeight = this.sideLength / 2 * Math.sqrt(3);
    this.triangle = this.buildRotatedTriangleShapePoints(this.sideLength, this.triangleHeight);
    this.tileWidth = this.sideLength * 3 + this.triangleHeight * 2;
    this.tileHeight = (this.hexHeight * 2) + (this.sideLength * 2);

    this.width = this.tileWidth;
    this.height = this.tileHeight;
  }

  protected generate(): SVGNode[] {
    return [
      // all 4 corners
      (styles: SVGNodeAttribute) => [
        this.createSquare(-this.sideLength / 2, -this.sideLength / 2, styles),
        this.createSquare(this.tileWidth - this.sideLength / 2, -this.sideLength / 2, styles),
        this.createSquare(-this.sideLength / 2, this.tileHeight - this.sideLength / 2, styles),
        this.createSquare(this.tileWidth - this.sideLength / 2, this.tileHeight - this.sideLength / 2, styles),
      ],
      // center / top square
      (styles: SVGNodeAttribute) => [
        this.createSquare(this.hexWidth / 2 + this.triangleHeight, this.hexHeight / 2, styles),
      ],
      // side squares
      (styles: SVGNodeAttribute) => [
        this.createSquare(-this.sideLength / 2, this.tileHeight / 2 - this.sideLength / 2, styles),
        this.createSquare(this.tileWidth - this.sideLength / 2, this.tileHeight / 2 - this.sideLength / 2, styles),
      ],
      // center / bottom square
      (styles: SVGNodeAttribute) => [
        // hex_width / 2 + triangle_height,
        // hex_height * 1.5 + side_length
        this.createSquare(this.hexWidth / 2 + this.triangleHeight, this.hexHeight * 1.5 + this.sideLength, styles),
      ],
      // left top / bottom triangle
      (styles: SVGNodeAttribute) => [
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.sideLength / 2, -this.sideLength / 2] },
            { rotate: [0, this.sideLength / 2, this.triangleHeight / 2] },
          ]),
        }),
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.sideLength / 2, this.tileHeight - -this.sideLength / 2] },
            { rotate: [0, this.sideLength / 2, this.triangleHeight / 2] },
            { scale: [1, -1] },
          ]),
        }),
      ],
      // right top / bottom triangle
      (styles: SVGNodeAttribute) => [
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.tileWidth - this.sideLength / 2, -this.sideLength / 2] },
            { rotate: [0, this.sideLength / 2, this.triangleHeight / 2] },
            { scale: [-1, 1] },
          ]),
        }),
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.tileWidth - this.sideLength / 2, this.tileHeight + this.sideLength / 2] },
            { rotate: [0, this.sideLength / 2, this.triangleHeight / 2] },
            { scale: [-1, -1] },
          ]),
        }),
      ],
      // center / top / right triangle
      (styles: SVGNodeAttribute) => [
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.tileWidth / 2 + this.sideLength / 2, this.hexHeight / 2] },
          ]),
        }),
      ],
      // center / top / left triangle
      (styles: SVGNodeAttribute) => [
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.tileWidth - this.tileWidth / 2 - this.sideLength / 2, this.hexHeight / 2] },
            { scale: [-1, 1] },
          ]),
        }),
      ],
      // center / bottom / right triangle
      (styles: SVGNodeAttribute) => [
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.tileWidth / 2 + this.sideLength / 2, this.tileHeight - this.hexHeight / 2] },
            { scale: [1, -1] },
          ]),
        }),
      ],
      // center / bottom / left triangle
      (styles: SVGNodeAttribute) => [
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.tileWidth - this.tileWidth / 2 - this.sideLength / 2, this.tileHeight - this.hexHeight / 2] },
            { scale: [-1, -1] },
          ]),
        }),
      ],
      // left / middle triangle
      (styles: SVGNodeAttribute) => [
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.sideLength / 2, this.tileHeight / 2 - this.sideLength / 2] },
          ]),
        }),
      ],
      // right / middle triangle
      (styles: SVGNodeAttribute) => [
        this.createTriangle({
          ...styles,
          transform: this.buildTransform([
            { translate: [this.tileWidth - this.sideLength / 2, this.tileHeight / 2 - this.sideLength / 2] },
            { scale: [-1, 1] },
          ]),
        }),
      ],
      // left / top square
      (styles: SVGNodeAttribute) => [
        this.createSquare(0, 0, {
          ...styles,
          transform: this.buildTransform([
            { translate: [this.sideLength / 2, this.sideLength / 2] },
            { rotate: [-30, 0, 0] },
          ]),
        }),
      ],
      // right / top square
      (styles: SVGNodeAttribute) => [
        this.createSquare(0, 0, {
          ...styles,
          transform: this.buildTransform([
            { scale: [-1, 1] },
            { translate: [-this.tileWidth + this.sideLength / 2, this.sideLength / 2] },
            { rotate: [-30, 0, 0] },
          ]),
        }),
      ],
      // left / center-top square
      (styles: SVGNodeAttribute) => [
        this.createSquare(0, 0, {
          ...styles,
          transform: this.buildTransform([
            { translate: [this.sideLength / 2, this.tileHeight / 2 - this.sideLength / 2 - this.sideLength] },
            { rotate: [30, 0, this.sideLength] },
          ]),
        }),
      ],
      // right / center-top square
      (styles: SVGNodeAttribute) => [
        this.createSquare(0, 0, {
          ...styles,
          transform: this.buildTransform([
            { scale: [-1, 1] },
            { translate: [-this.tileWidth + this.sideLength / 2, this.tileHeight / 2 - this.sideLength / 2 - this.sideLength] },
            { rotate: [30, 0, this.sideLength] },
          ]),
        }),
      ],
      // left / center-top square
      (styles: SVGNodeAttribute) => [
        this.createSquare(0, 0, {
          ...styles,
          transform: this.buildTransform([
            { scale: [1, -1] },
            { translate: [this.sideLength / 2, -this.tileHeight + this.tileHeight / 2 - this.sideLength / 2 - this.sideLength] },
            { rotate: [30, 0, this.sideLength] },
          ]),
        }),
      ],
      // right / center-bottom square
      (styles: SVGNodeAttribute) => [
        this.createSquare(0, 0, {
          ...styles,
          transform: this.buildTransform([
            { scale: [-1, -1] },
            { translate: [-this.tileWidth + this.sideLength / 2, -this.tileHeight + this.tileHeight / 2 - this.sideLength / 2 - this.sideLength] },
            { rotate: [30, 0, this.sideLength] },
          ]),
        }),
      ],
      // left / bottom square
      (styles: SVGNodeAttribute) => [
        this.createSquare(0, 0, {
          ...styles,
          transform: this.buildTransform([
            { scale: [1, -1] },
            { translate: [this.sideLength / 2, -this.tileHeight + this.sideLength / 2] },
            { rotate: [-30, 0, 0] },
          ]),
        }),
      ],
      // right / bottom square
      (styles: SVGNodeAttribute) => [
        this.createSquare(0, 0, {
          ...styles,
          transform: this.buildTransform([
            { scale: [-1, -1] },
            { translate: [-this.tileWidth + this.sideLength / 2, -this.tileHeight + this.sideLength / 2] },
            { rotate: [-30, 0, 0] },
          ]),
        }),
      ],
    ].reduce((nodes, generator, index) => {
      const value = this.seed.read(index, 1);
      const opacity = this.opacity(value);
      const fill = this.fillColor(value);

      const styles = {
        stroke: this.preset.stroke.color,
        "stroke-opacity": this.preset.stroke.opacity,
        fill,
        "fill-opacity": opacity,
        "stroke-width": 1,
      };

      nodes.push(...generator(styles));
      return nodes;
    }, [] as SVGNode[]);
  }

  private buildRotatedTriangleShapePoints(sideLength: number, width: number) {
    const halfHeight = sideLength / 2;
    return [
      0, 0,
      width, halfHeight,
      0, sideLength,
      0, 0,
    ].join(",");
  }

  private createSquare(x: number, y: number, styles: SVGNodeAttribute): SVGNode {
    return new SVGNode("rect", {
      x,
      y,
      width: this.sideLength,
      height: this.sideLength,
      ...styles,
    });
  }

  private createTriangle(
    styles: SVGNodeAttribute,
  ): SVGNode {
    return new SVGNode("polyline", {
      points: this.triangle,
      ...styles,
    });
  }
}
