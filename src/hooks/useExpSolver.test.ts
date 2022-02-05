import { RenderResult, renderHook, act } from "@testing-library/react-hooks";
import { useExpSolver, UseExpCounterType } from "./useExpSolver.ts";
import { XYData } from "types/xydata";
import { Params } from "types/params";




describe("useExpSolver", () => {
  let result: RenderResult<UseExpCounterType>;
  const testData = [
    { x: 7, y: -0.5 },
    { x: 6, y: -0.3 },
    { x: 5, y: 0 },
    { x: 4, y: 1 },
    { x: 3, y: 3 },
    { x: 2, y: 7 },
    { x: 1, y: 16 },
  ];
  const initParams: Params = {
    a: 54.45,
    b: 0.303030303,
    c: -24.45,
  };
  const fit1: Params = {
    a: 24.00091515,
    b: 0.482996265,
    c: 5.213188287,
  };
  const fit2: Params = {
    a: 32.43741149,
    b: 0.771109475,
    c: 0.166857419,
  };


  beforeEach(() => {
    result = renderHook(() => useExpSolver()).result;
    result.current.XYData.forEach((data: XYData) => act(() => result.current.removeXYData(data)));
    testData.forEach((data: XYData) => act(() => result.current.addXYData(data)));
  });
  // 参考：https://zenn.dev/bom_shibuya/articles/5c3ae7745c5e94

  test("constructs useExpSolver", () => {
    expect(result.current.XYData).toEqual([...testData].reverse());
  });

  test("init solve", () => {
    act(() => result.current.initSolve());
    expect(result.current.params.a).toBeCloseTo(initParams.a, 5);
    expect(result.current.params.b).toBeCloseTo(initParams.b, 5);
    expect(result.current.params.c).toBeCloseTo(initParams.c, 5);
  });

  test("solve 1 times", () => {
    act(() => result.current.initSolve());
    expect(result.current.params.a).toBeCloseTo(initParams.a, 5);
    expect(result.current.params.b).toBeCloseTo(initParams.b, 5);
    expect(result.current.params.c).toBeCloseTo(initParams.c, 5);

    act(() => {
      const fitParams = result.current.solve(result.current.params);
      expect(fitParams.a).toBeCloseTo(fit1.a, 5);
      expect(fitParams.b).toBeCloseTo(fit1.b, 5);
      expect(fitParams.c).toBeCloseTo(fit1.c, 5);
    });
  });

  test("solve 2 times", () => {
    act(() => result.current.initSolve());
    expect(result.current.params.a).toBeCloseTo(initParams.a, 5);
    expect(result.current.params.b).toBeCloseTo(initParams.b, 5);
    expect(result.current.params.c).toBeCloseTo(initParams.c, 5);

    act(() => {
      const fitParams = result.current.solve(initParams);
      expect(fitParams.a).toBeCloseTo(fit1.a, 5);
      expect(fitParams.b).toBeCloseTo(fit1.b, 5);
      expect(fitParams.c).toBeCloseTo(fit1.c, 5);
    });
    act(() => {
      const fitParams = result.current.solve(fit1);
      expect(fitParams.a).toBeCloseTo(fit2.a, 5);
      expect(fitParams.b).toBeCloseTo(fit2.b, 5);
      expect(fitParams.c).toBeCloseTo(fit2.c, 5);
    });
  });

  test("fitting", () => {
    act(() => result.current.fitting());
    expect(result.current.params.a).toBeCloseTo(35.894, 3);
    expect(result.current.params.b).toBeCloseTo(0.767, 3);
    expect(result.current.params.c).toBeCloseTo(-0.684, 3);
  });
});
