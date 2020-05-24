import { PatternComposer } from "./pattern-composer";
import { PatternPreset } from "./pattern-preset";
import { SVGNode } from "./svg";

export interface Structure {
  image: SVGNode[];
  preset: PatternPreset;
  name: string;
  composer: PatternComposer;
}
