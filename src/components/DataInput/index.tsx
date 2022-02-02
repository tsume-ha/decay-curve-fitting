import React from "react";
import { useState } from "react";
import {XYData} from "types/xydata";

type PropsType = {
  add: (xy: XYData) => void
}

export const DataInput = (props: PropsType) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (xData === undefined || yData === undefined) {
      return;
    }
    props.add({
      x: xData,
      y: yData
    });
    setXData(0);
    setYData(0);
  };
  const [xData, setXData] = useState<number|undefined>();
  const [yData, setYData] = useState<number|undefined>();
  const handleXChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setXData(Number(e.target.value));
  };
  const handleYChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setYData(Number(e.target.value));
  };

  return (
    <>
      <div>
        データインプット
        <form onSubmit={handleSubmit}>
          <label htmlFor="x-input">x: </label>
          <input id="x-input" type="number" step="0.0001" value={xData} onChange={handleXChange} />
          <label htmlFor="y-input">y: </label>
          <input id="y-input" type="number" step="0.0001" value={yData} onChange={handleYChange} />
          <button type="submit">ADD</button>
        </form>
      </div>
    </>
  );
};