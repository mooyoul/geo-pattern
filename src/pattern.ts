import { Background } from "./background";
import { Structure } from "./structure";

import { SVGNode } from "./svg";

export class Pattern {
  public background?: Background;
  public structure?: Structure;
  public width: number = 100;
  public height: number = 100;

  public toSVG() {
    const root = new SVGNode("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      width: Math.floor(this.width),
      height: Math.floor(this.height),
    }, [
      ...(this.background?.image ?? []),
      ...(this.structure?.image ?? []),
    ]);

    return root.toXML();
  }

  public toDataURL() {
    const svg = this.toSVG();

    return `data:image/svg+xml,${encodeURIComponent(svg)}`;
  }
}
