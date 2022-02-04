
import { Graph } from "components/Graph";
import { DataInput } from "components/DataInput";
import { DataList } from "components/DataList";
import { useExpSolver } from "hooks/useExpSolver";

const App = () => {
  const { XYData, params, addXYData, removeXYData } = useExpSolver();
  return (
    <div className="App">
      <Graph XYData={XYData} params={params} />
      <DataInput add={addXYData} />
      <DataList XYData={XYData} removeXYData={removeXYData} />
    </div>
  );
};

export default App;
