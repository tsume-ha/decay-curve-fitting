import { Params } from "types/params";
import { XYData } from "types/xydata";

type propsType = {
  params: Params,
  XYData: Array<XYData>;
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