import { XYData } from "types/xydata";

type PropsType = {
  XYData: Array<XYData>;
  removeXYData: (xydata: XYData) => void;
}

export const DataList = (props: PropsType) => {
  const { XYData, removeXYData} = props;
  return (
    <>
      <div>
        データ一覧
      </div>
      <ul>
        {XYData.map(data => (
          <li key={String(data.x)+String(data.y)}>
            x: {data.x}, y: {data.y}, <button onClick={() => removeXYData(data)}>del</button>
          </li>
        ))}
      </ul>
    </>
  );
};