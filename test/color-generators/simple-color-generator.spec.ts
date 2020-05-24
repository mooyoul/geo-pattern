import { expect } from "chai";

import { SimpleColorGenerator } from "../../src/color-generators";

describe(SimpleColorGenerator.name, () => {
  const color = "#ff00ff";

  let generator: SimpleColorGenerator;

  beforeEach(() => {
    generator = new SimpleColorGenerator(color);
  });

  describe("#generate", () => {
    it("should return color", async () => {
      const generatedColor = await generator.generate();
      expect(generatedColor.rgb().string()).to.eq("rgb(255, 0, 255)");
    });
  });
});
