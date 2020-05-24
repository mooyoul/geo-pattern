import { createHash } from "crypto";
import { Adapter } from "../adapter";
import { Seed } from "../seed";

export class NodeAdapter implements Adapter {
  public async createSeed(value: string): Promise<Seed> {
    const hash = createHash("sha1")
      .update(value, "utf8")
      .digest("hex");

    return new Seed(hash);
  }
}

export const adapter = new NodeAdapter();
