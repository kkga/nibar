import DateTime from "./lib/DateTime.jsx";
import Battery from "./lib/Battery.jsx";
import Cpu from "./lib/Cpu.jsx";
import Wifi from "./lib/Wifi.jsx";
import Error from "./lib/Error.jsx";
import parse from "./lib/parse.jsx";

const style = {
  display: "grid",
  padding: "0 12px",
  gridAutoFlow: "column",
  gridGap: "20px",
  height: "20px",
  position: "fixed",
  overflow: "hidden",
  right: "0px",
  top: "0px",
  fontFamily: "-apple-system",
  fontSize: "8pt",
  fontWeight: "500",
  lineHeight: "20px",
  color: "#6C6C6C"
};

export const refreshFrequency = 50000;

export const command = "./nibar/scripts/stats.sh";

export const render = ({ output }) => {
  console.log(`Right bar output: ${output}`);
  const data = parse(output);
  console.log(data);
  if (typeof data === "undefined") {
    return (
      <div style={style}>
        <Error msg="Error: unknown script output" side="right" />
      </div>
    );
  }
  return (
    <div style={style}>
      <Wifi output={data.wifi} />
      <Cpu output={data.cpu} />
      <Battery output={data.battery} />
      <DateTime output={data.datetime} />
    </div>
  );
};

export default null;
