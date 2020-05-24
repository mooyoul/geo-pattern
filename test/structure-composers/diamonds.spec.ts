import { expect } from "chai";
import { createComposer, readFixture, toPNG } from "../helper";

import { Pattern } from "../../src/pattern";
import { PatternPreset } from "../../src/pattern-preset";
import { DiamondsComposer } from "../../src/structure-composers/diamonds";

describe(DiamondsComposer.name, () => {
  let pattern: Pattern;
  let preset: PatternPreset;
  let composer: DiamondsComposer;

  beforeEach(() => {
    pattern = new Pattern();
    ({ composer, preset } = createComposer(DiamondsComposer));
  });

  describe("#compose", () => {
    it("should compose pattern", async () => {
      await composer.compose(pattern);

      expect(pattern).to.have.property("structure");
      const structure = pattern.structure!;
      expect(structure.name).to.eq("diamonds");
      expect(structure.preset).to.deep.eq(preset);
      expect(structure.composer).to.eq(composer);
      expect(structure.image).to.be.instanceOf(Array);

      const rendered = await toPNG(pattern.toSVG());
      const expected = await readFixture("structures/diamonds.svg");
      expect(rendered).to.matchImage(expected, {
        diff: { threshold: 0 },
        output: {
          on: "always",
          name: "diamonds",
          dir: "output",
        },
      });
    });
  });
});
