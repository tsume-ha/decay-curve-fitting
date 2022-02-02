import React from "react";

type propsType = {
  params: Array<number>
}

export const Graph = (props: propsType) => {
  const params = props.params;
  return (
    <>
      <div>
        グラフコンポーネント<br />
        a: {params[0]}, b: {params[1]}, c: {params[2]}        
      </div>
    </>
  );
};