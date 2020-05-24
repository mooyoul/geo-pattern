import { expect } from "chai";
import { createComposer, readFixture, toPNG } from "../helper";

import { Pattern } from "../../src/pattern";
import { PatternPreset } from "../../src/pattern-preset";
import { OverlappingCirclesComposer } from "../../src/structure-composers/overlapping-circles";

describe(OverlappingCirclesComposer.name, () => {
  let pattern: Pattern;
  let preset: PatternPreset;
  let composer: OverlappingCirclesComposer;

  beforeEach(() => {
    pattern = new Pattern();
    ({ composer, preset } = createComposer(OverlappingCirclesComposer));
  });

  describe("#compose", () => {
    it("should compose pattern", async () => {
      await composer.compose(pattern);

      expect(pattern).to.have.property("structure");
      const structure = pattern.structure!;
      expect(structure.name).to.eq("overlapping-circles");
      expect(structure.preset).to.deep.eq(preset);
      expect(structure.composer).to.eq(composer);
      expect(structure.image).to.be.instanceOf(Array);

      const rendered = await toPNG(pattern.toSVG());
      const expected = await readFixture("structures/overlapping-circles.svg");
      expect(rendered).to.matchImage(expected, {
        diff: { threshold: 0 },
        output: {
          on: "always",
          name: "overlapping-circles",
          dir: "output",
        },
      });
    });
  });
});
