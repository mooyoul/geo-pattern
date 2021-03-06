import { NodeAdapter } from "./adapters/node";
import { Pattern } from "./pattern";

import { generatePattern, GeneratePatternParams } from "./generate-pattern";

export { GeneratePatternParams, Pattern };
export { PatternTypes } from "./pattern-store";

export async function generate(params: GeneratePatternParams): Promise<Pattern> {
  return await generatePattern(params, new NodeAdapter());
}
