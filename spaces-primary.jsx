import Desktop from "./lib/Desktop.jsx";
import Error from "./lib/Error.jsx";
import parse from "./lib/parse.jsx";

const style = {
  height: "20px",
  padding: "0 12px",
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "20px",
  position: "fixed",
  overflow: "hidden",
  left: "0px",
  top: "0px",
  lineHeight: "20px",
  fontFamily: "-apple-system",
  fontSize: "8pt",
  fontWeight: "500",
  color: "#bcbcbc"
};

export const refreshFrequency = false;

export const command = "./nibar/scripts/spaces-primary.sh";

export const render = ({ output }) => {
  console.log(`Left bar output: ${output}`);
  const data = parse(output);
  if (typeof data === "undefined") {
    return (
      <div style={style}>
        <Error msg="Error: unknown script output" side="left" />
      </div>
    );
  }
  if (typeof data.error !== "undefined") {
    return (
      <div style={style}>
        <Error msg={`Error: ${data.error}`} side="left" />
      </div>
    );
  }
  return (
    <div style={style}>
      <Desktop output={data.desktop} />
    </div>
  );
};

export default null;
