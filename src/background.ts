import Color from "color";

import { ColorPreset } from "./color-preset";
import { PatternComposer } from "./pattern-composer";
import { SVGNode } from "./svg";

export interface Background {
  image: SVGNode[];
  preset: ColorPreset;
  color: Color;
  composer: PatternComposer;
}
