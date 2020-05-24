import chai from "chai";
import { chaiImage } from "chai-image";
import { promises as fs } from "fs";
import sharp from "sharp";
import sinon from "sinon";

import { PatternComposer, PatternComposerConstructor } from "../src/pattern-composer";
import { PatternPreset } from "../src/pattern-preset";
import { Seed } from "../src/seed";

chai.use(chaiImage);

export const sandbox = sinon.createSandbox();

export async function toPNG(input: string | Buffer): Promise<Buffer> {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;

  return await sharp(buf).png().toBuffer();
}

export async function readFixture(name: string): Promise<Buffer> {
  const fixture = await fs.readFile(`fixtures/${name}`);
  return await toPNG(fixture);
}

export function createFakeSeed(behaviors: {
  args: [number, number];
  value: number;
}[]) {
  const seed = new Seed("fake");

  const seedReadStub = sandbox.stub(seed, "read");
  for (const { args, value } of behaviors) {
    seedReadStub.withArgs(...args).returns(value);
  }

  return seed;
}

export function createComposer<T extends PatternComposer>(
  ComposerConstructor: PatternComposerConstructor<T>,
): {
  seed: Seed;
  preset: PatternPreset;
  composer: T;
} {
  const seed = new Seed("c053ecf9ed41df0311b9df13cc6c3b6078d2d3c2"); // fake
  const preset = {
    stroke: {
      color: "#000",
      opacity: 0.02,
    },
    fill: {
      dark: "#222",
      light: "#ddd",
    },
    opacity: {
      min: 0.02,
      max: 0.15,
    },
  };

  return {
    seed,
    preset,
    composer: new ComposerConstructor(seed, preset),
  };
}

afterEach(() => {
  sandbox.verifyAndRestore();
});
