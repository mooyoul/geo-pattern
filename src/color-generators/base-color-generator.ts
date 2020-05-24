import Color from "color";
import { map } from "../processing";
import { Seed } from "../seed";

import { ColorGenerator } from "./base";

export class BaseColorGenerator implements ColorGenerator {
  public constructor(
    private readonly color: string,
    private readonly seed: Seed,
  ) {}

  public generate() {
    return this.transform(this.color, this.seed);
  }

  private transform(color: string, seed: Seed): Color {
    const hueOffset = map(seed.read(14, 3), 0, 4095, 0, 359);
    const satOffset = seed.read(17, 1);

    let newColor = Color(color).hsl();

    newColor = newColor.hue(newColor.hue() - hueOffset);
    newColor = satOffset % 2 === 0 ?
      newColor.saturationl(newColor.saturationl() + satOffset) :
      newColor.saturationl(newColor.saturationl() - satOffset);

    return newColor.rgb();
  }
}
