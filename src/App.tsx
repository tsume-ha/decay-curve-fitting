import React from "react";
import { useState } from "react";
import { Graph } from "components/Graph";
import { DataInput } from "components/DataInput";
import { DataList } from "components/DataList";
import { XYData } from "types/xydata";

const App = () => {
  const [XYData, setXYData] = useState([
    {x: 1, y: 2},
    {x: 2, y: 4},
    {x: 3, y: 8},
  ]);
  const addXYData = (xydata: XYData) => {
    setXYData([xydata, ...XYData]);
  };
  const params: Array<number> = [1,2,3];
  return (
    <div className="App">
      <Graph params={params} />
      <DataInput add={addXYData} />
      <DataList XYData={XYData} />
    </div>
  );
};

export default App;
