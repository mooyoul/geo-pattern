import Color from "color";

import { BaseColorGenerator, SimpleColorGenerator } from "../color-generators";
import { ColorPreset, ColorPresetMode } from "../color-preset";
import { Pattern } from "../pattern";
import { PatternComposer } from "../pattern-composer";
import { Seed } from "../seed";
import { SVGNode } from "../svg";

export class SolidBackgroundComposer implements PatternComposer {
  private readonly color: Color;

  public constructor(
    private readonly seed: Seed,
    private readonly preset: ColorPreset,
  ) {
    this.color = this.selectColor(seed, preset);
  }

  public async compose(pattern: Pattern) {
    pattern.background = {
      image: this.generate(),
      preset: this.preset,
      color: this.color,
      composer: this,
    };
  }

  private generate() {
    return [new SVGNode("rect", {
      x: 0,
      y: 0,
      width: "100%",
      height: "100%",
      fill: this.color.rgb().string(),
    })];
  }

  private selectColor(seed: Seed, preset: ColorPreset) {
    const generator = preset.mode === ColorPresetMode.BaseColor ?
      new BaseColorGenerator(preset.baseColor!, seed) :
      new SimpleColorGenerator(preset!.color!);

    return generator.generate();
  }
}
