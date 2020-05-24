export interface PatternFill {
  dark: string;
  light: string;
}
export interface PatternStroke {
  color: string;
  opacity: number;
}
export interface PatternOpacity {
  min: number;
  max: number;
}

export interface PatternPreset {
  fill: PatternFill;
  stroke: PatternStroke;
  opacity: PatternOpacity;
}
