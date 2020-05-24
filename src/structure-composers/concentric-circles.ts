import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class ConcentricCirclesComposer extends StructureComposer {
  public readonly name = "concentric-circles";

  private readonly scale: number;
  private readonly ringSize: number;
  private readonly strokeWidth: number;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.scale = this.seed.read(0, 1);
    this.ringSize = this.map(this.scale, 0, 15, 10 ,60);
    this.strokeWidth = this.ringSize / 5;

    this.width = this.height = (this.ringSize + this.strokeWidth) * 6;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];

    let i = 0;
    for (let y = 0; y <= 5; y++) {
      for (let x = 0 ; x <= 5; x++) {
        this.drawOuterCircle(nodes, x, y, i);
        this.drawInnerCircle(nodes, x, y, i);

        i++;
      }
    }

    return nodes;
  }

  private drawOuterCircle(nodes: SVGNode[], x: number, y: number, i: number) {
    const value = this.seed.read(i, 1);
    const opacity = this.opacity(value);
    const fill = this.fillColor(value);

    nodes.push(new SVGNode("circle", {
      cx: x * this.ringSize + x * this.strokeWidth + (this.ringSize + this.strokeWidth) / 2,
      cy: y * this.ringSize + y * this.strokeWidth + (this.ringSize + this.strokeWidth) / 2,
      r: this.ringSize / 2,
      fill: "none",
      stroke: fill,
      style: `opacity: ${opacity}; stroke-width: ${this.strokeWidth}px`,
    }));
  }

  private drawInnerCircle(nodes: SVGNode[], x: number, y: number, i: number) {
    const value = this.seed.read(39 - i, 1);
    const opacity = this.opacity(value);
    const fill = this.fillColor(value);

    nodes.push(new SVGNode("circle", {
      cx: x * this.ringSize + x * this.strokeWidth + (this.ringSize + this.strokeWidth) / 2,
      cy: y * this.ringSize + y * this.strokeWidth + (this.ringSize + this.strokeWidth) / 2,
      r: this.ringSize / 4,
      fill,
      "fill-opacity": opacity,
    }));
  }
}
