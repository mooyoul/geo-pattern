import { stripIndent as ruby } from "common-tags";
import debug from "debug";
import execa from "execa";
import { promises as fs } from "fs";
import { JSDOM } from "jsdom";
import path from "path";

const input = "fake";
const patterns = [
  "chevrons",
  "concentric_circles",
  "diamonds",
  "hexagons",
  "mosaic_squares",
  "nested_squares",
  "octagons",
  "overlapping_circles",
  "overlapping_rings",
  "plaid",
  "plus_signs",
  "sine_waves",
  "squares",
  "tessellation",
  "triangles",
  "xes",
];

const log = debug("script");
log.enabled = true;

(async () => {
  log("starting");

  // basic
  await save("basic.svg", await generate());
  await save("with-color.svg", await generateWithColor("#fc0"));
  await save("with-base-color.svg", await generateWithBaseColor("#fc0"));

  // structure only
  for (const pattern of patterns) {
    const output = await generateStructure(pattern);

    await save(`structures/${pattern.replace(/_/g, "-")}.svg`, output);
    log("generated %s", pattern);
  }
})().catch(log); // tslint:disable-line

async function save(name: string, content: string) {
  const normalized = normalize(content);

  await fs.writeFile(
    path.join(__dirname, name),
    normalized,
  );
}

async function generateStructure(structure: string): Promise<string> {
  const res = await execa("ruby", {
    input: ruby`
      require "geo_pattern"

      pattern = GeoPattern.generate(${JSON.stringify(input.toString())}, patterns: [:${structure}])
      pattern.background = nil

      puts pattern.to_svg
    `,
  });

  return res.stdout;
}

async function generate(): Promise<string> {
  const res = await execa("ruby", {
    input: ruby`
      require "geo_pattern"

      pattern = GeoPattern.generate(${JSON.stringify(input.toString())})

      puts pattern.to_svg
    `,
  });

  return res.stdout;
}

async function generateWithColor(color: string): Promise<string> {
  const res = await execa("ruby", {
    input: ruby`
      require "geo_pattern"

      pattern = GeoPattern.generate(${JSON.stringify(input.toString())}, color: "${color}")

      puts pattern.to_svg
    `,
  });

  return res.stdout;
}

async function generateWithBaseColor(baseColor: string): Promise<string> {
  const res = await execa("ruby", {
    input: ruby`
      require "geo_pattern"

      pattern = GeoPattern.generate(${JSON.stringify(input.toString())}, base_color: "${baseColor}")

      puts pattern.to_svg
    `,
  });

  return res.stdout;
}

function normalize(dirty: string): string {
  const { window } = new JSDOM(dirty);

  return window.document.querySelector("svg")!.outerHTML;
}
