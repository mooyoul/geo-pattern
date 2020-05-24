import chai from "chai";
import { chaiImage } from "chai-image";
import { promises as fs } from "fs";
import sharp from "sharp";

chai.use(chaiImage);

export async function toPNG(input: string | Buffer): Promise<Buffer> {
  const buf = typeof input === "string" ? Buffer.from(input, "utf8") : input;

  return await sharp(buf).png().toBuffer();
}

export async function readFixture(name: string): Promise<Buffer> {
  const fixture = await fs.readFile(`fixtures/${name}`);
  return await toPNG(fixture);
}
