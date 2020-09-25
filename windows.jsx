import App from "./lib/App.jsx";
import Error from "./lib/Error.jsx";
import parse from "./lib/parse.jsx";
import styles from "./lib/styles.jsx";
import config from "./config.json"


const style = {
  padding: "0 8px",
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "16px",
  position: "fixed",
  overflow: "hidden",
  left: config.windows_pad,
  top: "0px",
  fontFamily: styles.fontFamily,
  lineHeight: styles.lineHeight,
  fontSize: styles.fontSize,
  color: styles.colors.dim,
  fontWeight: styles.fontWeight
};

export const refreshFrequency = false;
export const command = "./nibar/scripts/windows.sh";

export const render = ({ output }) => {
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
      {/*<Error>{data.windows}</Error>*/}
      <App output={data.windows} />
    </div>
  );
};

export default null;
