import sha1 from "tiny-sha1";
import { Adapter } from "../adapter";
import { Seed } from "../seed";

export class BrowserAdapter implements Adapter {
  public async createSeed(value: string) {
    const encoder = new TextEncoder();
    const buf = encoder.encode(value);
    const hash = sha1(buf);
    return new Seed(hash);
  }
}

export const adapter = new BrowserAdapter();
