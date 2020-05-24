import { Adapter } from "./adapter";
import { SolidBackgroundComposer } from "./background-composers";
import { ColorPreset } from "./color-preset";
import { Pattern } from "./pattern";
import { PatternComposer } from "./pattern-composer";
import { PatternPreset } from "./pattern-preset";
import { PatternSelector } from "./pattern-selector";
import { PatternValidator } from "./pattern-validator";
import { Seed } from "./seed";

export interface PatternGeneratorParams {
  seed: Seed;
  patterns?: string[];
  color?: string;
  baseColor?: string;
}

export class PatternGenerator {
  public readonly seed: Seed;
  public readonly color: ColorPreset;
  public readonly preset: PatternPreset;

  public readonly backgroundComposer: PatternComposer;
  public readonly structureComposer: PatternComposer;

  public constructor(
    params: PatternGeneratorParams,
  ) {
    this.seed = params.seed;
    this.preset = {
      fill: {
        dark: "#222",
        light: "#ddd",
      },
      stroke: {
        color: "#000",
        opacity: 0.02,
      },
      opacity: {
        min: 0.02,
        max: 0.15,
      },
    };

    this.color = new ColorPreset("#933c3c");
    if (params.color) {
      this.color.color = params.color;
    }

    if (params.baseColor) {
      this.color.baseColor = params.baseColor;
    }

    const requestedPatterns = params.patterns || [];
    const validator = new PatternValidator();
    validator.validate(requestedPatterns);

    const structureSelector = new PatternSelector(requestedPatterns, this.seed);
    const SelectedStructure = structureSelector.select();

    this.backgroundComposer = new SolidBackgroundComposer(this.seed, this.color);
    this.structureComposer = new SelectedStructure(this.seed, this.preset);
  }

  public async generate() {
    const pattern = new Pattern();

    await this.backgroundComposer.compose(pattern);
    await this.structureComposer.compose(pattern);

    return pattern;
  }
}
