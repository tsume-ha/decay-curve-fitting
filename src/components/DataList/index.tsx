import { XYData } from "types/xydata";
import "./index.css";

type PropsType = {
  XYData: Array<XYData>;
  removeXYData: (xydata: XYData) => void;
}

export const DataList = (props: PropsType) => {
  const { XYData, removeXYData} = props;
  return (
    <div id="data-list">
      データ一覧
      <ul>
        {XYData.map(data => (
          <li key={String(data.x)+String(data.y)}>
            <span>x: {data.x}</span>
            <span>y: {data.y}</span>
            <button onClick={() => removeXYData(data)}>del</button>
          </li>
        ))}
      </ul>
    </div>
  );
};