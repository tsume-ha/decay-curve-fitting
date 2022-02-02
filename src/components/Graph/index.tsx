import React from "react";
import { Params } from "types/params";

type propsType = {
  params: Params
}

export const Graph = (props: propsType) => {
  const params = props.params;
  return (
    <>
      <div>
        グラフコンポーネント<br />
        a: {params.a}, b: {params.b}, c: {params.c}        
      </div>
    </>
  );
};