import { useEffect, useState } from "react";
import { XYData } from "types/xydata";
import { Params } from "types/params";
import { Matrix, MatrixError} from "math/matrix";

export type UseExpCounterType = {
  XYData: Array<XYData>;
  params: Params;
  addXYData: (xydata: XYData) => void;
  removeXYData: (xydata: XYData) => void;
}

const accuracy = 0.001;
const maxTrialNum = 50;

export const useExpSolver = (): UseExpCounterType => {
  const [XYData, setXYData] = useState<Array<XYData>>([
    { x: 0.038, y: 0.050 },
    { x: 0.194, y: 0.127 },
    { x: 0.425, y: 0.094 },
    { x: 0.626, y: 0.2122 },
    { x: 1.253, y: 0.2729 },
    { x: 2.5, y: 0.2665 },
    { x: 3.74, y: 0.3317 },
  ]);
  const [params, setParams] = useState<Params>({
    a: 1,
    b: 2,
    c: 3
  });
  const [trialNum, setTrialNum] = useState<number>(0);
  const [initFlag, setInitFrag] = useState<boolean>(false);
  const [scaleFactor, setScaleFactor] = useState<number>(0.5);

  const initSolve = (): void => {
    // y = a (1 - bx + b^2 x^2 / 2) + c
    // exp項を2時近似
    // XYDataのはじめ3つを使い、paramsを計算する
    if (XYData.length < 3) {
      throw new Error("init solver needs more then 3 data.");
    }
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
    setInitFrag(true);
    // console.log("init fitting");
    // console.log({before: params, setTo:{a, b, c}});
    setParams({ a, b, c });
  };

  const solve = (): void => {
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

    const paramMatrix = new Matrix([[a], [b], [c]]).add(
      jacobian.transpose().multiple(jacobian).inverse3().multiple(
        jacobian.transpose()
      ).multiple(residual).multiple(new Matrix([[scaleFactor]]))
    );
    const newParams: Params = {
      a: paramMatrix.value[0][0],
      b: paramMatrix.value[1][0],
      c: paramMatrix.value[2][0],
    };
    if (
      Math.abs(newParams.a - a) < accuracy
      && Math.abs(newParams.b - b) < accuracy
      && Math.abs(newParams.c - c) < accuracy
    ) {
      // 収束したとき
      console.log(`${String(trialNum)}回で収束しました。`);
      setTrialNum(0);
      return;
    } else if (trialNum >= maxTrialNum) {
      console.warn(`収束しませんでした。試行回数: ${String(trialNum)}`);
      return;
    } else {
      // 収束しなかったとき
      setTrialNum(trialNum + 1);

      if (newParams.b < 0) {
        console.warn("指数の肩が正になりました");
        console.log(newParams.b);
        newParams.a = 0;
        newParams.b = 0.1;
      }

      // console.log("fitting");
      // console.log({ before: params, setTo: newParams });
      setParams(newParams);
    }
  };

  const addXYData = (xydata: XYData): void => {
    setXYData([...XYData, xydata]);
  };
  const removeXYData = (xydata: XYData): void => {
    const index = XYData.indexOf(xydata);
    if (index === -1) {
      return;
    }
    const currentData = [...XYData];
    currentData.splice(index, 1);
    setXYData(currentData);
  };

  // XYDataが変わったらinitFragを立てる
  useEffect(() => {
    if (XYData.length === 0) {
      setInitFrag(false);
    }
  }, [XYData]);

  // fitting
  useEffect(() => {
    if (XYData.length < 3) { return; }
    if (!initFlag) {
      initSolve();
      return;
    }
    try {
      solve();
    } catch (error) {
      if (error instanceof MatrixError) {
        console.error(error);
      } else {
        throw error;
      }
    }
    return;
  }, [XYData, params]);


  return { XYData, params, addXYData, removeXYData};
};