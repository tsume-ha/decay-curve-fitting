import {XYData} from "types/xydata";

type PropsType = {
  XYData: Array<XYData>
}

export const DataList = (props: PropsType) => {
  const {XYData} = props;
  return (
    <>
      <div>
        データ一覧
      </div>
      <ul>
        {XYData.map(data => (
          <li key={String(data.x)+String(data.y)}>
            x: {data.x}, y: {data.y}
          </li>
        ))}
      </ul>
    </>
  )
}