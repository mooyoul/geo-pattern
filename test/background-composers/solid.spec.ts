import { expect } from "chai";
import { createFakeSeed } from "../helper";

import { SolidBackgroundComposer } from "../../src/background-composers";
import { ColorPreset } from "../../src/color-preset";
import { Pattern } from "../../src/pattern";
import { Seed } from "../../src/seed";

describe(SolidBackgroundComposer.name, () => {
  const color = "#aaaaaa";
  const baseColor = "#bbbbbb";

  let pattern: Pattern;

  let composer: SolidBackgroundComposer;
  let seed: Seed;

  beforeEach(() => {
    seed = createFakeSeed([
      { args: [14, 3], value: 2616 },
      { args: [17, 1], value: 3 },
    ]);

    pattern = new Pattern();
  });

  describe("#generate", () => {
    context("when base color is given", () => {
      beforeEach(() => {
        const preset = new ColorPreset(baseColor);
        composer = new SolidBackgroundComposer(seed, preset);
      });

      it("should compose background", async () => {
        await composer.compose(pattern);

        expect(pattern).to.have.property("background");
        const { background } = pattern;
        expect(background?.color.hex().toLowerCase()).to.eq(baseColor);
        expect(background?.composer).to.eq(composer);
        expect(background?.preset).to.be.instanceOf(ColorPreset);
        expect(background?.image).to.be.instanceOf(Array).with.length(1);
        expect(background?.image[0]?.toXML()).to.eq(`<rect x="0" y="0" width="100%" height="100%" fill="rgb(187, 187, 187)"></rect>`);
      });
    });

    context("when color is given", () => {
      beforeEach(() => {
        const preset = new ColorPreset(baseColor, color);
        composer = new SolidBackgroundComposer(seed, preset);
      });

      it("should compose background", async () => {
        await composer.compose(pattern);

        expect(pattern).to.have.property("background");
        const { background } = pattern;
        expect(background?.color.hex().toLowerCase()).to.eq(color);
        expect(background?.composer).to.eq(composer);
        expect(background?.preset).to.be.instanceOf(ColorPreset);
        expect(background?.image).to.be.instanceOf(Array).with.length(1);
        expect(background?.image[0]?.toXML()).to.eq(`<rect x="0" y="0" width="100%" height="100%" fill="rgb(170, 170, 170)"></rect>`);
      });
    });
  });
});
