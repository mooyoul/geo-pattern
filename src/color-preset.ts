export enum ColorPresetMode {
  Color,
  BaseColor,
}

export class ColorPreset {
  public constructor(
    public baseColor: string,
    public color?: string,
  ) {}

  public get mode() {
    if (!this.color) {
      return ColorPresetMode.BaseColor;
    }

    return ColorPresetMode.Color;
  }
}
