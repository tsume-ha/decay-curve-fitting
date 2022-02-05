import Matrix from "./matrix";
type MatrixType = Array<Array<number>>

test("constructs new matrix", () => {
  const mat = [[1, 2],
    [3, 4]];
  const matrix = new Matrix(mat);
  expect(matrix.n).toBe(2);
  expect(matrix.m).toBe(2);
  // toEqualとtoBe
  // 参考：https://zenn.dev/t_poyo/articles/4c47373e364718
  expect(matrix.value).toEqual(mat);
  expect(matrix.value).toEqual([...mat]);
  // toEqualでは値が一致すればpass
  expect(matrix.value).toBe(mat);
  expect(matrix.value).not.toBe([...mat]);
  // toBeでは参照が一致すればpass
  // このように値のみ一致する場合はfail
});

test("add matrixs", () => {
  const a = new Matrix([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ]);
  const b = new Matrix([
    [3, 3, 3],
    [3, 3, 3],
    [3, 3, 3]
  ]);
  expect(a.add(b).value).toEqual([
    [4, 5, 6],
    [7, 8, 9],
    [10,11,12]
  ]);
  expect(b.add(a).value).toEqual([
    [4, 5, 6],
    [7, 8, 9],
    [10, 11, 12]
  ]);
});

const arrayValueToBeCloseTo = (
  received: MatrixType, toBeVal: MatrixType
): void => (
  received.forEach((row, i) => (
    row.forEach((num, j) => expect(num).toBeCloseTo(toBeVal[i][j]), 5)
  ))
);

test("add matrixs float", () => {
  const a = new Matrix([
    [0.1, 0.2, 0.3],
    [0.4, 0.5, 0.6],
    [0.7, 0.8, 0.9]
  ]);
  const b = new Matrix([
    [0.3, 0.3, 0.3],
    [0.3, 0.3, 0.3],
    [0.3, 0.3, 0.3]
  ]);
  const toBe = [
    [0.4, 0.5, 0.6],
    [0.7, 0.8, 0.9],
    [1.0, 1.1, 1.2]
  ];
  arrayValueToBeCloseTo(a.add(b).value, toBe);
  arrayValueToBeCloseTo(b.add(a).value, toBe);
});


test("multiple matrixs", () => {
  const a = new Matrix([
    [0.2, -0.1, 0.2],
    [0.1, 0.5, -0.2]
  ]);
  const b = new Matrix([
    [0.2, 0.3, -0.2],
    [0, -0.2, 0.7],
    [0.1, 0.1, 0.3]
  ]);
  const toBe = [
    [0.06, 0.1, -0.05],
    [0, -0.09, 0.27]
  ];
  arrayValueToBeCloseTo(a.multiple(b).value, toBe);
});

test("calculates determinant 3x3", () => {
  const a = new Matrix([
    [0.1, 0.2],
    [0.3, 0.4]
  ]);
  expect(a.det2()).toBeCloseTo(-0.02, 5);
});

test("calculates float determinant 3x3", () => {
  const a = new Matrix([
    [0.2, 0.3, 0.5],
    [0.8, 1.3, -0.1],
    [0.6,-0.9,0.6]
  ]);
  expect(a.det3()).toBeCloseTo(-0.774, 5);
});

test("transposes matrix", () => {
  const a = new Matrix([
    [0.2, 0.3, 0.5],
    [0.8, 1.3, -0.1],
    [0.6, -0.9, 0.6]
  ]);
  const toBe = [
    [0.2, 0.8, 0.6],
    [0.3, 1.3, -0.9],
    [0.5, -0.1, 0.6]
  ];
  arrayValueToBeCloseTo(a.transpose().value, toBe);
});

test("inverseas a matrix 3x3", () => {
  const a = new Matrix([
    [0.1, 0.2, 0.1],
    [0.2, 0.3, 0.1],
    [0.1, 0.2, 0.2]
  ]);
  const toBe = [
    [-40, 20, 10],
    [30, -10, -10],
    [-10, 0, 10]
  ];
  arrayValueToBeCloseTo(a.inverse3().value, toBe);
});
