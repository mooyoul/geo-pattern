import { Seed } from "./seed";

export interface Adapter {
  createSeed(value: string): Promise<Seed>;
}
