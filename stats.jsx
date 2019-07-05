import DateTime from "./lib/DateTime/index.jsx";
import Battery from "./lib/Battery/index.jsx";
import Cpu from "./lib/Cpu/index.jsx";
import Wifi from "./lib/Wifi/index.jsx";
import Error from "./lib/Error/index.jsx";
import { rightSide } from "./lib/style.jsx";
import parse from "./lib/parse.jsx";

export const refreshFrequency = 50000;

export const command = "./nibar/stats.sh";

export const render = ({ output }) => {
  console.log(`Right bar output: ${output}`);
  const data = parse(output);
  console.log(data);
  if (typeof data === "undefined") {
    return (
      <div style={rightSide}>
        <Error msg="Error: unknown script output" side="right" />
      </div>
    );
  }
  return (
    <div style={rightSide}>
      <Wifi output={data.wifi} />
      <Cpu output={data.cpu} />
      <Battery output={data.battery} />
      <DateTime output={data.datetime} />
    </div>
  );
};

export default null;
