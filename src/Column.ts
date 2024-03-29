export class Column {
  min: number = 0;
  max: number = 0;
  amplitude: number = 0;
  sum: number = 0;
  quantity: number = 0;
  readonly color: string;

  constructor(readonly title: string, readonly index: number) {
    this.color = `#${this.hexFromIndexMul(57)}${this.hexFromIndexMul(23)}${this.hexFromIndexMul(37)}`;
  }

  private hexFromIndexMul(mul: number): string {
    return (((mul * this.index) & 0x7F) + 64).toString(16);
  }

  add(v: number): void {
    if (isNaN(v)) {
      return;
    }
    if (this.quantity === 0) {
      this.min = this.max = v;
    } else if (v < this.min) {
      this.min = v;
    } else if (v > this.max) {
      this.max = v;
    }
    this.amplitude = this.max - this.min;
    ++this.quantity;
    this.sum += v;
  }

  avg(): number {
    return this.sum / this.quantity;
  }

  isConstant(): boolean {
    return this.amplitude === 0;
  }

  getProportion(line: number[]): number {
    return (line[this.index] - this.min) / this.amplitude;
  }

  getProportionForZero(): number {
    return -this.min / this.amplitude;
  }
}
