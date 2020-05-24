import { PatternComposerConstructor } from "./pattern-composer";
import { defaultStore, PatternStore } from "./pattern-store";
import { Seed } from "./seed";

export class PatternSelector {
  private readonly patterns: PatternComposerConstructor[];
  private readonly seed: Seed;
  private readonly store: PatternStore;

  public constructor(
    patterns: string[],
    seed: Seed,
    store: PatternStore = defaultStore,
  ) {
    this.seed = seed;
    this.store = store;
    this.patterns = this.fetchPatterns(patterns);
  }

  public select(): PatternComposerConstructor {
    const index = Math.min(this.seed.read(20, 1), this.patterns.length - 1);

    return this.patterns[index];
  }

  private fetchPatterns(patterns: string[]): PatternComposerConstructor[] {
    const fetched = Array.from(new Set(patterns))
      .map((pattern) => this.store.get(pattern))
      .filter((pattern): pattern is PatternComposerConstructor => !!pattern);

    return fetched.length > 0 ?
      fetched :
      Array.from(this.store.values());
  }
}
