import styles from "./styles.jsx";

const containerStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "8px"
};

const desktopStyle = {
  width: "3ch",
};

const renderSpace = (index, focused, visible, windows) => {
  let contentStyle = JSON.parse(JSON.stringify(desktopStyle));
  let hasWindows = windows.length > 0;
  if (focused == 1) {
    contentStyle.color = styles.colors.accent;
    contentStyle.fontWeight = "700";
  } else if (visible == 1) {
    contentStyle.color = styles.colors.fg;
  }
  return (
    <div style={contentStyle}>
      &nbsp;{index}
      {hasWindows ? "°" : " "}
    </div>
  );
};

const render = ({ output }) => {
  if (typeof output === "undefined") return null;

  const spaces = [];

  output.forEach(function(space) {
    spaces.push(renderSpace(space.index, space.focused, space.visible, space.windows));
  });

  return (
    <div style={containerStyle}>
      {spaces}
    </div>
  );
};

export default render;
