import {XYData} from "types/xydata";

type PropsType = {
  xydata: Array<XYData>
}

export const DataList = (props: PropsType) => {
  const xydata = props.xydata;
  return (
    <>
      <div>
        データ一覧
      </div>
      <ul>
        {xydata.map(data => (
          <li key={String(data.x)+String(data.y)}>
            x: {data.x}, y: {data.y}
          </li>
        ))}
      </ul>
    </>
  )
}