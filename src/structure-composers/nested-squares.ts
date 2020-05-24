import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode, SVGNodeAttribute } from "../svg";

import { StructureComposer } from "./base";

export class NestedSquaresComposer extends StructureComposer {
  public readonly name = "nested-squares";

  private readonly blockSize: number;
  private readonly squareSize: number;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.blockSize = this.map(this.seed.read(0, 1), 0, 15, 4, 12);
    this.squareSize = this.blockSize * 7;

    this.width = this.height = (this.squareSize + this.blockSize) * 6 + this.blockSize * 6;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        this.drawInnerSquare(nodes, x, y, i);
        this.drawOuterSquare(nodes, x, y, i);

        i++;
      }
    }

    return nodes;
  }

  private drawInnerSquare(nodes: SVGNode[], x: number, y: number, i: number) {
    const value = this.seed.read(i, 1);
    const opacity = this.opacity(value);
    const fill = this.fillColor(value);

    const styles = {
      fill: "none",
      stroke: fill,
      style: `opacity: ${opacity}; stroke-width: ${this.blockSize}px`,
    };

    nodes.push(
      new SVGNode("rect", {
        x: x * this.squareSize + x * this.blockSize * 2 + this.blockSize / 2,
        y: y * this.squareSize + y * this.blockSize * 2 + this.blockSize / 2,
        width: this.squareSize,
        height: this.squareSize,
        ...styles,
      }),
    );
  }

  private drawOuterSquare(nodes: SVGNode[], x: number, y: number, i: number) {
    const value = this.seed.read(39 - i, 1);
    const opacity = this.opacity(value);
    const fill = this.fillColor(value);

    const styles = {
      fill: "none",
      stroke: fill,
      style: `opacity: ${opacity}; stroke-width: ${this.blockSize}px`,
    };

    nodes.push(
      new SVGNode("rect", {
        x: x * this.squareSize + x * this.blockSize * 2 + this.blockSize / 2 + this.blockSize * 2,
        y: y * this.squareSize + y * this.blockSize * 2 + this.blockSize / 2 + this.blockSize * 2,
        width: this.blockSize * 3,
        height: this.blockSize * 3,
        ...styles,
      }),
    );
  }
}
