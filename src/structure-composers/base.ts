import { Pattern } from "../pattern";
import { PatternComposer } from "../pattern-composer";
import { PatternPreset } from "../pattern-preset";
import { map } from "../processing";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

export type Translate = {
  translate: number[];
  rotate?: never;
  scale?: never;
};
export type Rotate = {
  translate?: never;
  rotate: number[];
  scale?: never;
};
export type Scale = {
  translate?: never;
  rotate?: never;
  scale: number[];
};
export type TransformCommand = Translate | Rotate | Scale;

export abstract class StructureComposer implements PatternComposer {
  public abstract readonly name: string;

  public width: number = 100;
  public height: number = 100;

  protected readonly map = map;

  public constructor(
    protected seed: Seed,
    protected preset: PatternPreset,
  ) {}

  public async compose(pattern: Pattern) {
    pattern.structure = {
      image: this.generate(),
      preset: this.preset,
      name: this.name,
      composer: this,
    };
    pattern.width = this.width;
    pattern.height = this.height;
  }

  protected fillColor(value: number) {
    return value % 2 === 0 ? this.preset.fill.light : this.preset.fill.dark;
  }

  protected opacity(value: number) {
    return this.map(value, 0, 15, this.preset.opacity.min, this.preset.opacity.max);
  }

  protected buildPlusShape(size: number): SVGNode[] {
    return [
      new SVGNode("rect", {
        x: size,
        y: 0,
        width: size,
        height: size * 3,
      }),
      new SVGNode("rect", {
        x: 0,
        y: size,
        width: size * 3,
        height: size,
      }),
    ];
  }

  protected buildTransform(commands: TransformCommand[]): string {
    return commands.map((command) => {
      const { translate, rotate, scale } = command;

      if (translate) {
        return `translate(${translate.join(",")})`;
      } else if (rotate) {
        return `rotate(${rotate.join(",")})`;
      } else if (scale) {
        return `scale(${scale.join(",")})`;
      }
    }).join(" ");
  }

  protected abstract generate(): SVGNode[];
}
