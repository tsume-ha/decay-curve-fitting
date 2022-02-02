import Matrix from "./matrix";
import { XYData } from "types/xydata";

export default class Solver{
  data: Array<XYData>;
  params: Matrix;

  constructor() {
    this.data = [];
    this.params = new Matrix([[1],[2],[3]]);
  }
  initSolve(): Matrix {
    // y = a (1 - bx + b^2 x^2 / 2) + c
    // exp項を2時近似
    // dataのはじめ3つを使い、paramsを計算する
    if (this.data.length < 3) {
      throw new Error("init solver needs more then 3 data.");
    }
    const x12: number = this.data[0].x - this.data[1].x;
    const x13: number = this.data[0].x - this.data[2].x;
    const y12: number = this.data[0].y- this.data[1].y;
    const y13: number = this.data[0].y- this.data[2].y;
    const x12sq: number = this.data[0].x**2 - this.data[1].x**2;
    const x13sq: number = this.data[0].x**2 - this.data[2].x**2;
    const y1: number = this.data[0].y;
    const x1: number = this.data[0].x;

    const b: number = (
      2 * (
        x12 * y13 - x13 * y12
      ) / (
        x12sq * y13 - x13sq * y12
      )
    );
    const a: number = (
      y12 / (
        -1 * b * x12 + b**2 * x12sq / 2
      )
    );
    const c: number = y1 - a * (1 - b * x1 + (b*x1)**2 / 2);
    
    this.params = new Matrix([[a], [b], [c]]);
    return new Matrix([[a], [b], [c]]);
  }
  solve(): Matrix {
    const a: number = this.params.value[0][0];
    const b: number = this.params.value[1][0];
    const c: number = this.params.value[2][0];
    const da = (x: number): number => Math.exp(-1 * b * x);
    const db = (x: number): number => -1 * a * x * Math.exp(-1 * b * x);
    const dc = (_: number|undefined): number => 1;

    const jacobian = new Matrix(
      this.data.map((xydata: XYData): Array<number> => {
        return [
          da(xydata.x), db(xydata.x), dc(xydata.x)
        ];
      })
    );
    
    const residual = new Matrix(
      this.data.map((xydata: XYData): Array<number> => {
        return [(
          xydata.y - (a * Math.exp(-1 * b *xydata.x) + c)
        )];
      })
    );

    return this.params.add(
      jacobian.transpose().multiple(jacobian).inverse3().multiple(
        jacobian.transpose()
      ).multiple(residual)
    );
  }
  fitting (tryNum=15, accuracy=0.00001): void {
    if (this.data.length < 3) {
      return;
    }
    if (this.data.length === 3 || this.params === null) {
      this.initSolve();
    }
    let counter = 0;
    while(counter < tryNum) {
      const calculated = this.solve();
      if (
        Math.abs(calculated.value[0][0] - this.params.value[0][0]) < accuracy
        && Math.abs(calculated.value[1][0] - this.params.value[1][0]) < accuracy
        && Math.abs(calculated.value[2][0] - this.params.value[2][0]) < accuracy
      ) {
        break;
      }
      this.params = calculated;
      counter++;
    }
  }

  pushData(xydata: XYData) {
    this.data.push(xydata);
  }

}

