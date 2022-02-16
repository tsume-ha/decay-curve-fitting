import { Graph } from "components/Graph";
import { DataInput } from "components/DataInput";
import { DataList } from "components/DataList";
import { useExpSolver } from "hooks/useExpSolver";
import "App.css";

const App = () => {
  const { XYData, params, addXYData, removeXYData } = useExpSolver();
  return (
    <div id="App">
      <h3>Fitting curve</h3>
      <Graph XYData={XYData} params={params} />
      <DataInput add={addXYData} />
      <DataList XYData={XYData} removeXYData={removeXYData} />
    </div>
  );
};

export default App;
