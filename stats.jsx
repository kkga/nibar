import DateTime from "./lib/DateTime.jsx";
import Battery from "./lib/Battery.jsx";
import Cpu from "./lib/Cpu.jsx";
import Wifi from "./lib/Wifi.jsx";
import Dnd from "./lib/Dnd.jsx";
import Error from "./lib/Error.jsx";
import parse from "./lib/parse.jsx";
import styles from "./lib/styles.jsx";

const style = {
  display: "grid",
  padding: "0 12px",
  gridAutoFlow: "column",
  gridGap: "16px",
  position: "fixed",
  overflow: "hidden",
  right: "0px",
  top: "0px",
  color: styles.colors.dim,
  fontFamily: styles.fontFamily,
  lineHeight: styles.lineHeight
};

export const refreshFrequency = 5000;

export const command = "./nibar/scripts/stats.sh";

export const render = ({ output }) => {
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
      <Dnd output={data.dnd} />
      <Wifi output={data.wifi} />
      <Cpu output={data.cpu} />
      <Battery output={data.battery} />
      <DateTime output={data.datetime} />
    </div>
  );
};

export default null;
