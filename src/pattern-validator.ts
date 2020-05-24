import { defaultStore, PatternStore } from "./pattern-store";

export class PatternValidator {
  public constructor(
    private store: PatternStore = defaultStore,
  ) {}

  public validate(patterns: string[]): void {
    for (const pattern of patterns) {
      if (!this.store.has(pattern)) {
        throw new TypeError(`${pattern} is invalid pattern`);
      }
    }
  }
}
