import { useState } from "react";
import { XYData } from "types/xydata";
import { Params } from "types/params";
import Matrix from "math/matrix";

interface useExpSolverType {
  XYData: Array<XYData>;
  params: Params;
  addXYData: (xydata: XYData) => void;
  removeXYData: (xydata: XYData) => void;
}

const initParam: Params = {
  a: 1,
  b: 2,
  c: 3
};

export const useExpSolver = (): useExpSolverType => {
  const [XYData, setXYData] = useState<Array<XYData>>([
    {x:1,y:16},
    {x:2,y:7},
    {x:3,y:3},
    {x:4,y:1},
    {x:5,y:0},
  ]);
  const [params, setParams] = useState<Params>({
    a: 1,
    b: 2,
    c: 3
  });

  const initSolve = (): void => {
    // y = a (1 - bx + b^2 x^2 / 2) + c
    // exp項を2時近似
    // XYDataのはじめ3つを使い、paramsを計算する
    if (XYData.length < 3) {
      throw new Error("init solver needs more then 3 data.");
    }
    console.log("init solve");
    const x12: number = XYData[0].x - XYData[1].x;
    const x13: number = XYData[0].x - XYData[2].x;
    const y12: number = XYData[0].y - XYData[1].y;
    const y13: number = XYData[0].y - XYData[2].y;
    const x12sq: number = XYData[0].x ** 2 - XYData[1].x ** 2;
    const x13sq: number = XYData[0].x ** 2 - XYData[2].x ** 2;
    const y1: number = XYData[0].y;
    const x1: number = XYData[0].x;
    const b: number = (
      2 * (
        x12 * y13 - x13 * y12
      ) / (
        x12sq * y13 - x13sq * y12
      )
    );
    const a: number = (
      y12 / (
        -1 * b * x12 + b ** 2 * x12sq / 2
      )
    );
    const c: number = y1 - a * (1 - b * x1 + (b * x1) ** 2 / 2);
    console.log({ a, b, c });
    setParams({a, b, c});
  };

  const getMatrixParams = (params: Params): Matrix => {
    const { a, b, c } = params;
    return new Matrix([[a], [b], [c]]);
  };
  const getParamsFromMatrix = (matrix: Matrix): Params => {
    return {
      a: matrix.value[0][0],
      b: matrix.value[1][0],
      c: matrix.value[2][0],
    };
  };

  const solve = (): Params => {
    const { a, b, c } = params;
    const da = (x: number): number => Math.exp(-1 * b * x);
    const db = (x: number): number => -1 * a * x * Math.exp(-1 * b * x);
    const dc = (_: number | undefined): number => 1;

    const jacobian = new Matrix(
      XYData.map((xydata: XYData): Array<number> => {
        return [
          da(xydata.x), db(xydata.x), dc(xydata.x)
        ];
      })
    );

    const residual = new Matrix(
      XYData.map((xydata: XYData): Array<number> => {
        return [(
          xydata.y - (a * Math.exp(-1 * b * xydata.x) + c)
        )];
      })
    );

    const paramMatrix = getMatrixParams(params).add(
      jacobian.transpose().multiple(jacobian).inverse3().multiple(
        jacobian.transpose()
      ).multiple(residual)
    );
    return getParamsFromMatrix(paramMatrix);
  };


  const fitting = (tryNum = 15, accuracy = 0.00001): void => {
    if (XYData.length < 3) {
      return;
    }
    if (XYData.length === 3 || (
      params.a === initParam.a ||
      params.b === initParam.b ||
      params.c === initParam.c
    )) {
      initSolve();
    }
    let counter = 0;
    while (counter < tryNum) {
      const calculated: Params = solve();
      if (
        Math.abs(calculated.a - params.a) < accuracy
        && Math.abs(calculated.b - params.b) < accuracy
        && Math.abs(calculated.c - params.c) < accuracy
      ) {
        break;
      }
      console.log(calculated);
      setParams(calculated);
      counter++;
    }
  };

  const addXYData = (xydata: XYData): void => {
    setXYData([xydata, ...XYData]);
    fitting();
  };
  const removeXYData = (xydata: XYData): void => {
    const index = XYData.indexOf(xydata);
    if (index === -1) {
      return;
    }
    const currentData = [...XYData];
    currentData.splice(index, 1);
    setXYData(currentData);
    fitting();
  };

  return { XYData, params, addXYData, removeXYData};
};