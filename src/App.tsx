import { useState } from 'react';
import { Graph } from 'components/Graph';
import { DataInput } from 'components/DataInput';
import { DataList } from 'components/DataList';
import { XYData } from 'types/xydata';

const App = () => {
  const [XYData, setXYData] = useState([
    {x: 1, y: 2},
    {x: 2, y: 4},
    {x: 3, y: 8},
  ])
  const addXYData = (xydata: XYData) => {
    setXYData([xydata, ...XYData])
  }
  return (
    <div className="App">
      <Graph />
      <DataInput add={addXYData} />
      <DataList XYData={XYData} />
    </div>
  );
}

export default App;
