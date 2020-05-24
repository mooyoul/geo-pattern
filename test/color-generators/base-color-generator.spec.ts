import { expect } from "chai";
import { createFakeSeed } from "../helper";

import { BaseColorGenerator } from "../../src/color-generators";

describe(BaseColorGenerator.name, () => {
  const color = "#ff00ff";

  let generator: BaseColorGenerator;

  describe("#generate", () => {
    context("when sat offset is % 2 == 0", () => {
      beforeEach(() => {
        const seed = createFakeSeed([
          { args: [14, 3], value: 2616 },
          { args: [17, 1], value: 2 },
        ]);

        generator = new BaseColorGenerator(color, seed);
      });

      it("should return color", async () => {
        const generatedColor = await generator.generate();
        expect(generatedColor.rgb().string()).to.eq("rgb(210, 255, 0)");
      });
    });

    context("when sat offset is not % 2 == 0", () => {
      beforeEach(() => {
        const seed = createFakeSeed([
          { args: [14, 3], value: 2616 },
          { args: [17, 1], value: 3 },
        ]);

        generator = new BaseColorGenerator(color, seed);
      });

      it("should return color", async () => {
        const generatedColor = await generator.generate();
        expect(generatedColor.rgb().string()).to.eq("rgb(207, 251, 4)");
      });
    });
  });
});
