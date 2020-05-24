import { Adapter } from "./adapter";
import { PatternGenerator } from "./pattern-generator";

export interface GeneratePatternParams {
  input: string;
  patterns?: string[];
  color?: string;
  baseColor?: string;
}

export async function generatePattern(params: GeneratePatternParams, adapter: Adapter) {
  const seed = await adapter.createSeed(params.input);

  const generator = new PatternGenerator({
    seed,
    patterns: params.patterns,
    color: params.color,
    baseColor: params.baseColor,
  });

  return await generator.generate();
}

