import { PatternComposerConstructor } from "./pattern-composer";

import {
  ChevronsComposer,
  ConcentricCirclesComposer,
  DiamondsComposer,
  HexagonsComposer,
  MosaicSquaresComposer,
  NestedSquaresComposer,
  OctagonsComposer,
  OverlappingCirclesComposer,
  OverlappingRingsComposer,
  PlaidComposer,
  PlusSignsComposer,
  SineWavesComposer,
  SquaresComposer,
  TessellationComposer,
  TrianglesComposer,
  XesComposer,
} from "./structure-composers";

export const enum PatternTypes {
  Chevrons = "chevrons",
  ConcentricCircles = "concentric-circles",
  Diamonds = "diamonds",
  Hexagons = "hexagons",
  MosaicSquares = "mosaic-squares",
  NestedSquares = "nested-squares",
  Octagons = "octagons",
  OverlappingCircles = "overlapping-circles",
  OverlappingRings = "overlapping-rings",
  Plaid = "plaid",
  PlusSigns = "plus-signs",
  SineWaves = "sine-waves",
  Squares = "squares",
  Tessellation = "tessellation",
  Triangles = "triangles",
  Xes = "xes",
}

export type PatternStore = Map<string, PatternComposerConstructor>;
export const defaultStore = new Map<PatternTypes, PatternComposerConstructor>([
  [PatternTypes.Chevrons, ChevronsComposer],
  [PatternTypes.ConcentricCircles, ConcentricCirclesComposer],
  [PatternTypes.Diamonds, DiamondsComposer],
  [PatternTypes.Hexagons, HexagonsComposer],
  [PatternTypes.MosaicSquares, MosaicSquaresComposer],
  [PatternTypes.NestedSquares, NestedSquaresComposer],
  [PatternTypes.Octagons, OctagonsComposer],
  [PatternTypes.OverlappingCircles, OverlappingCirclesComposer],
  [PatternTypes.OverlappingRings, OverlappingRingsComposer],
  [PatternTypes.Plaid, PlaidComposer],
  [PatternTypes.PlusSigns, PlusSignsComposer],
  [PatternTypes.SineWaves, SineWavesComposer],
  [PatternTypes.Squares, SquaresComposer],
  [PatternTypes.Tessellation, TessellationComposer],
  [PatternTypes.Triangles, TrianglesComposer],
  [PatternTypes.Xes, XesComposer],
]);
