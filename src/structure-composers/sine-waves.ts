import { PatternPreset } from "../pattern-preset";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

import { StructureComposer } from "./base";

export class SineWavesComposer extends StructureComposer {
  public readonly name = "sine-waves";

  private readonly period: number;
  private readonly amplitude: number;
  private readonly waveWidth: number;

  public constructor(
    seed: Seed,
    preset: PatternPreset,
  ) {
    super(seed, preset);

    this.period = Math.floor(this.map(this.seed.read(0, 1), 0, 15, 100, 400));
    this.amplitude = Math.floor(this.map(this.seed.read(1, 1), 0, 15, 30, 100));
    this.waveWidth = Math.floor(this.map(this.seed.read(2, 1), 0, 15, 3, 30));

    this.width = this.period;
    this.height = this.waveWidth * 36;
  }

  protected generate(): SVGNode[] {
    const nodes: SVGNode[] = [];
    const offsetX = Math.floor(this.period / 4) * 0.7;

    for (let i = 0; i <= 35; i++) {
      const value = this.seed.read(i, 1);
      const opacity = this.opacity(value);
      const fill = this.fillColor(value);

      const styles = {
        fill: "none",
        stroke: fill,
        style: `opacity: ${opacity}; stroke-width: ${this.waveWidth}px`,
      };

      const d = [
        `M0 ${this.amplitude}`,
        `C ${offsetX} 0, ${Math.floor(this.period / 2) - offsetX} 0, ${Math.floor(this.period / 2)} ${this.amplitude}`,
        `S ${this.period - offsetX} ${this.amplitude * 2}, ${this.period} ${this.amplitude}`,
        `S ${this.period * 1.5 - offsetX} 0, ${this.period * 1.5}, ${this.amplitude}`,
      ].join(" ");

      const translateX = 0 - Math.floor(this.period / 4);
      const translateY = this.waveWidth * i - this.amplitude * 1.5;

      nodes.push(
        new SVGNode("path", {
          d,
          ...styles,
          transform: this.buildTransform([
            { translate: [translateX, translateY] },
          ]),
        }),
        new SVGNode("path", {
          d,
          ...styles,
          transform: this.buildTransform([
            { translate: [translateX, translateY + this.waveWidth * 36] },
          ]),
        }),
      );
    }

    return nodes;
  }
}
