import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Scatter } from "react-chartjs-2";

import { Params } from "types/params";
import { XYData } from "types/xydata";

import "./index.css";


ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip
);

type propsType = {
  params: Params,
  XYData: Array<XYData>;
}
export const Graph = (props: propsType) => {
  const { a, b, c } = props.params;
  const XYData = props.XYData;
  const xDataArray = XYData.map(data => data.x);
  const xMax = Math.max(...xDataArray);
  const xMin = Math.min(...xDataArray);
  const begin = xMin - (xMax - xMin) * 0.2;
  const end = xMax + (xMax - xMin) * 0.3;
  const data = {
    datasets: [
      {
        type: "scatter" as const,
        label: "input data",
        showLine: false,
        data: XYData,
        backgroundColor: "rgba(255, 99, 132, 1)",
        order: 0,
        radius: 6,
        hoverRadius: 7,
      },
      {
        type: "scatter" as const,
        label: "fitting curve",
        showLine: true,
        data: Array.from({ length: 100 }, (_: undefined, i: number) => {
          const x = begin + (end - begin) * 0.01 * i;
          const y = a * Math.exp(-1 * b * x) + c;
          return { x, y };
        }),
        order: 1,
        borderWidth: 4,
        borderColor: "rgba(41, 119, 196, 1)",
        radius: 0,
        hitRadius: 0,
      },
    ]
  };
  return (
    <div id="graph-display">
      <div>
        <Scatter data={data} />
      </div>
      <p>
        current equation: a exp(-bx) + c<br />
        a: {a}<br />
        b: {b}<br />
        c: {c}<br />
      </p>
    </div>
  );
};