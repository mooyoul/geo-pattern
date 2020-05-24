export interface SVGNodeAttribute {
  [key: string]: string | number;
}

export class SVGNode {
  public constructor(
    public readonly nodeName: string,
    public readonly attributes: SVGNodeAttribute,
    public readonly childNode: SVGNode[] = [],
  ) {}

  public appendChild(...elements: SVGNode[]) {
    this.childNode.push(...elements);
  }

  public toXML(): string {
    const attrs = Object.keys(this.attributes).map((name) => ` ${name}="${this.attributes[name]}"`).join("");
    const inner = this.childNode.map((children) => children.toXML()).join("");
    return `<${this.nodeName}${attrs}>${inner}</${this.nodeName}>`;
  }
}
