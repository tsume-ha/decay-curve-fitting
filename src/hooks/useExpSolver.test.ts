import { RenderResult, renderHook, act } from "@testing-library/react-hooks";
import { useExpSolver, UseExpCounterType } from "./useExpSolver";
import { XYData } from "types/xydata";
import { Params } from "types/params";


describe("useExpSolver", () => {
  let result: RenderResult<UseExpCounterType>;
  const testData = [
    { x: 1, y: 16 },
    { x: 2, y: 7 },
    { x: 3, y: 3 },
    { x: 4, y: 1 },
    { x: 5, y: 0 },
    { x: 6, y: -0.3 },
    { x: 7, y: -0.5 }
  ];
  // const initParams: Params = {
  //   a: 54.45,
  //   b: 0.303030303,
  //   c: -24.45,
  // };
  // const fit1: Params = {
  //   a: 24.00091515,
  //   b: 0.482996265,
  //   c: 5.213188287,
  // };
  // const fit2: Params = {
  //   a: 32.43741149,
  //   b: 0.771109475,
  //   c: 0.166857419,
  // };


  beforeEach(() => {
    result = renderHook(() => useExpSolver()).result;
    result.current.XYData.forEach((data: XYData) => act(() => result.current.removeXYData(data)));
    testData.forEach((data: XYData) => act(() => result.current.addXYData(data)));
  });
  // 参考：https://zenn.dev/bom_shibuya/articles/5c3ae7745c5e94

  test("constructs useExpSolver", () => {
    expect(result.current.XYData).toEqual([...testData]);
  });

  test("fitting", () => {
    expect(result.current.params.a).toBeCloseTo(35.894, 2);
    expect(result.current.params.b).toBeCloseTo(0.767, 2);
    expect(result.current.params.c).toBeCloseTo(-0.684, 2);
  });
});
