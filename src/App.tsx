
import { Graph } from "components/Graph";
import { DataInput } from "components/DataInput";
import { DataList } from "components/DataList";
import { useExpSolver } from "hooks/useExpSolver";

const App = () => {
  const { XYData, params, addXYData } = useExpSolver();
  return (
    <div className="App">
      <Graph params={params} />
      <DataInput add={addXYData} />
      <DataList XYData={XYData} />
    </div>
  );
};

export default App;
