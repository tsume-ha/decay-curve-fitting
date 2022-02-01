import { Graph } from 'components/Graph';
import { DataInput } from 'components/DataInput';
import { DataList } from 'components/DataList';

function App() {
  const xydata = [
    {x: 1, y: 2},
    {x: 2, y: 4},
    {x: 3, y: 8},
  ]
  return (
    <div className="App">
      <Graph />
      <DataInput />
      <DataList xydata={xydata} />
    </div>
  );
}

export default App;
