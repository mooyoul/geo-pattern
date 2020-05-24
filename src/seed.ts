export class Seed {
  private readonly seed: string;

  public constructor(value: string) {
    this.seed = value;
  }

  public read(offset: number, length: number): number {
    return parseInt(this.seed.slice(offset, offset + length), 16);
  }
}
