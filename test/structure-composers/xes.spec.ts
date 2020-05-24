import { expect } from "chai";
import { createComposer, readFixture, toPNG } from "../helper";

import { Pattern } from "../../src/pattern";
import { PatternPreset } from "../../src/pattern-preset";
import { XesComposer } from "../../src/structure-composers/xes";

describe(XesComposer.name, () => {
  let pattern: Pattern;
  let preset: PatternPreset;
  let composer: XesComposer;

  beforeEach(() => {
    pattern = new Pattern();
    ({ composer, preset } = createComposer(XesComposer));
  });

  describe("#compose", () => {
    it("should compose pattern", async () => {
      await composer.compose(pattern);

      expect(pattern).to.have.property("structure");
      const structure = pattern.structure!;
      expect(structure.name).to.eq("xes");
      expect(structure.preset).to.deep.eq(preset);
      expect(structure.composer).to.eq(composer);
      expect(structure.image).to.be.instanceOf(Array);

      const rendered = await toPNG(pattern.toSVG());
      const expected = await readFixture("structures/xes.svg");
      expect(rendered).to.matchImage(expected, {
        diff: { threshold: 0 },
        output: {
          on: "always",
          name: "xes",
          dir: "output",
        },
      });
    });
  });
});
