import { expect } from "chai";
import { readFixture, toPNG } from "../helper";

import { generate } from "../../src";

describe("geo-pattern Node.js E2E", () => {
  const input = "fake";
  const color = "#fc0";
  const baseColor = color;

  describe("#generate", () => {
    context("with input only", () => {
      it("should generate SVG", async () => {
        const pattern = await generate({ input });

        const expected = await readFixture("basic.svg");
        const actual = await toPNG(pattern.toSVG());

        expect(actual).to.matchImage(expected, {
          diff: { threshold: 0 },
          output: {
            on: "always",
            name: "node-basic",
            dir: "output",
          },
        });
      });
    });

    context("with color", () => {
      it("should generate SVG", async () => {
        const pattern = await generate({ input, color });

        const expected = await readFixture("with-color.svg");
        const actual = await toPNG(pattern.toSVG());

        expect(actual).to.matchImage(expected, {
          diff: { threshold: 0 },
          output: {
            on: "always",
            name: "node-with-color",
            dir: "output",
          },
        });
      });
    });

    context("with base color", () => {
      it("should generate SVG", async () => {
        const pattern = await generate({ input, baseColor });

        const expected = await readFixture("with-base-color.svg");
        const actual = await toPNG(pattern.toSVG());

        expect(actual).to.matchImage(expected, {
          diff: { threshold: 0 },
          output: {
            on: "always",
            name: "node-with-base-color",
            dir: "output",
          },
        });
      });
    });
  });
});

