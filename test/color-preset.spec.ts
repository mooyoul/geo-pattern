import { expect } from "chai";

import { ColorPreset, ColorPresetMode } from "../src/color-preset";

describe(ColorPreset.name, () => {
  const baseColor = "#ff00ff";
  const color = "#aabbcc";

  let preset: ColorPreset;

  context("with color", () => {
    beforeEach(() => {
      preset = new ColorPreset(baseColor, color);
    });

    it("should expose baseColor", () => {
      expect(preset.baseColor).to.eq(baseColor);
    });

    it("should expose color", () => {
      expect(preset.color).to.eq(color);
    });

    it("should expose mode", () => {
      expect(preset.mode).to.eq(ColorPresetMode.Color);
    });
  });

  context("with baseColor", () => {
    beforeEach(() => {
      preset = new ColorPreset(baseColor);
    });

    it("should expose baseColor", () => {
      expect(preset.baseColor).to.eq(baseColor);
      expect(preset.color).to.eq(undefined);
    });

    it("should expose mode", () => {
      expect(preset.mode).to.eq(ColorPresetMode.BaseColor);
    });
  });
});
