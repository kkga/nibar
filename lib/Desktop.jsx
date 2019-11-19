import styles from "./styles.jsx";

const containerStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "8px"
};

const desktopStyle = {
  width: "2ch"
};

const renderSpace = (index, active, windows) => {
  let contentStyle = JSON.parse(JSON.stringify(desktopStyle));
  let hasWindows = windows > 0;
  if (index == active) {
    contentStyle.color = styles.colors.fg;
  }
  return (
    <div style={contentStyle}>
      {index}
      {hasWindows ? "°" : " "}
    </div>
  );
};

const render = ({ output }) => {
  if (typeof output === "undefined") return null;

  const spaces = [];

  output.spaces.forEach(function(space) {
    spaces.push(renderSpace(space.index, output.active, space.windows));
  });

  return (
    <div style={containerStyle}>
      {spaces}
    </div>
  );
};

export default render;
