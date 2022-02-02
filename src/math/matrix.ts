type MatrixType = Array<Array<number>>

export default class Matrix {
  n: number;// tate
  m: number;//  yoko
  value: MatrixType;

  constructor(value: MatrixType) {
    this.n = value.length;
    this.m = value[0].length;
    for (let i = 0; i < this.n; i++) {
      if (value[i].length !== this.m) {
        throw new Error("col num is different");
      }
    }
    this.value = value;
  }
  add(matrix: Matrix): Matrix {
    if (!(this.n === matrix.n && this.m === matrix.m)) {
      throw new Error("Matrix size is different in 'add'");
    }
    return new Matrix(this.value.map((row: Array<number>, i: number) => {
      return row.map((num: number, j: number) => {
        return num + matrix.value[i][j];
      });
    }));
  }
  det2(): number {
    if (!(this.n === 2 && this.m === 2)) {
      throw new Error("only 2x2 matrix size is allowed in det2");
    }
    return this.value[0][0] * this.value[1][1] - this.value[0][1] * this.value[1][0];
  }
  det3(): number {
    if (!(this.n === 3 && this.m === 3)) {
      throw new Error("only 3x3 matrix size is allowed in det3");
    }
    return (
      this.value[0][0] * this.value[1][1] * this.value[2][2] +
      this.value[0][1] * this.value[1][2] * this.value[2][0] +
      this.value[0][2] * this.value[1][0] * this.value[2][1] -
      this.value[0][2] * this.value[1][1] * this.value[2][0] -
      this.value[0][0] * this.value[1][2] * this.value[2][1] -
      this.value[0][1] * this.value[1][0] * this.value[2][2]
    );
  }
  multiple(matrix: Matrix): Matrix {
    if (this.m !== matrix.n) {
      throw new Error("matrix size error, size is incollect; nxk * kxm => nxm");
    }
    const result: MatrixType = [];
    for (let i = 0; i < this.n; i++) {
      const row: Array<number> = [];
      for (let j = 0; j < matrix.m; j++) {
        let c = 0;
        for (let k = 0; k < this.m; k++) {
          c += this.value[i][k] * matrix.value[k][j];
        }
        row.push(c);
      }
      result.push(row);
    }
    return new Matrix(result);
  }
  inverse3(): Matrix {
    if (!(this.n === 3 && this.m === 3)) {
      throw new Error("only 3x3 matrix size is allowed in inverse3");
    }
    const det = this.det3();
    if (det === 0) {
      throw new Error("determinant is 0");
    }
    return new Matrix([
      [
        this.value[1][1] * this.value[2][2] - this.value[1][2] * this.value[2][1],
        this.value[0][2] * this.value[2][1] - this.value[0][1] * this.value[2][2],
        this.value[0][1] * this.value[1][2] - this.value[0][2] * this.value[1][1]
      ],
      [
        this.value[1][2] * this.value[2][0] - this.value[1][0] * this.value[2][2],
        this.value[0][0] * this.value[2][2] - this.value[0][2] * this.value[2][0],
        this.value[0][2] * this.value[1][0] - this.value[0][0] * this.value[1][2]
      ],
      [
        this.value[1][0] * this.value[2][1] - this.value[1][1] * this.value[2][0],
        this.value[0][1] * this.value[2][0] - this.value[0][0] * this.value[2][1],
        this.value[0][0] * this.value[1][1] - this.value[0][1] * this.value[1][0]
      ]
    ]).multiple(new Matrix([
      [1 / det, 0, 0],
      [0, 1 / det, 0],
      [0, 0, 1 / det]
    ]));
  }
  transpose(): Matrix {
    const result = [];
    for (let j = 0; j < this.m; j++) {
      const row = [];
      for (let i = 0; i < this.n; i++) {
        row.push(this.value[i][j]);
      }
      result.push(row);
    }
    return new Matrix(result);
  }
}