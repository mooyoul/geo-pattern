import { Adapter } from "../adapter";
import { Seed } from "../seed";

export class BrowserNativeAdapter implements Adapter {
  public async createSeed(value: string): Promise<Seed> {
    const bufInput = new TextEncoder().encode(value).buffer;
    const bufHash = await window.crypto.subtle.digest("SHA-1", bufInput);

    const hash = Array.from(new Uint8Array(bufHash))
      .map((byte) => `00${byte.toString(16)}`.slice(-2))
      .join("");

    return new Seed(hash);
  }
}
