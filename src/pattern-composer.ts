import { Pattern } from "./pattern";
import { PatternPreset } from "./pattern-preset";
import { Seed } from "./seed";

export type PatternComposerConstructor<T extends PatternComposer = PatternComposer> = new (seed: Seed, preset: PatternPreset) => T;

export interface PatternComposer {
  compose(pattern: Partial<Pattern>): Promise<void>;
}
