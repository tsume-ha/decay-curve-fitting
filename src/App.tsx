import React from "react";
import { useState } from "react";
import { Graph } from "components/Graph";
import { DataInput } from "components/DataInput";
import { DataList } from "components/DataList";
import { XYData } from "types/xydata";
import { Params } from "types/params";
import ExpSolver from "math/expSolver";

const App = () => {
  const [XYData, setXYData] = useState<Array<XYData>>([
    {x: 1, y: 16},
  ]);
  const [params, setParams] = useState<Params>({
    a: 1,
    b: 2,
    c: 3
  });
  const addXYData = (xydata: XYData) => {
    setXYData([xydata, ...XYData]);
    if (XYData.length >= 3) {
      const solver = new ExpSolver(XYData, params);
      console.log("solve");
      console.log(solver);
      solver.initSolve();
      solver.fitting();
      setParams({
        a: solver.params.value[0][0],
        b: solver.params.value[1][0],
        c: solver.params.value[2][0],
      });
    }
  };
  return (
    <div className="App">
      <Graph params={params} />
      <DataInput add={addXYData} />
      <DataList XYData={XYData} />
    </div>
  );
};

export default App;
