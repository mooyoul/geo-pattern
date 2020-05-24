import Color from "color";
import { ColorGenerator } from "./base";

export class SimpleColorGenerator implements ColorGenerator {
  public constructor(
    private readonly color: string,
  ) {}

  public generate() {
    return Color(this.color).rgb();
  }
}
