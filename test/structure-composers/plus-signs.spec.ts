import { expect } from "chai";
import { createComposer, readFixture, toPNG } from "../helper";

import { Pattern } from "../../src/pattern";
import { PatternPreset } from "../../src/pattern-preset";
import { PlusSignsComposer } from "../../src/structure-composers/plus-signs";

describe(PlusSignsComposer.name, () => {
  let pattern: Pattern;
  let preset: PatternPreset;
  let composer: PlusSignsComposer;

  beforeEach(() => {
    pattern = new Pattern();
    ({ composer, preset } = createComposer(PlusSignsComposer));
  });

  describe("#compose", () => {
    it("should compose pattern", async () => {
      await composer.compose(pattern);

      expect(pattern).to.have.property("structure");
      const structure = pattern.structure!;
      expect(structure.name).to.eq("plus-signs");
      expect(structure.preset).to.deep.eq(preset);
      expect(structure.composer).to.eq(composer);
      expect(structure.image).to.be.instanceOf(Array);

      const rendered = await toPNG(pattern.toSVG());
      const expected = await readFixture("structures/plus-signs.svg");
      expect(rendered).to.matchImage(expected, {
        diff: { threshold: 0 },
        output: {
          on: "always",
          name: "plus-signs",
          dir: "output",
        },
      });
    });
  });
});
