import styles from "./styles.jsx";
import run from "uebersicht";
import config from '../config.json'

const containerStyle = {
  display: "grid",
  gridAutoFlow: "column",
  gridGap: "3px"
};

const desktopStyle = {
    maxWidth: config.windows_max_win,
    overflow: "hidden"

};


const renderWindow = (app, focused, visible) => {
  let contentStyle = JSON.parse(JSON.stringify(desktopStyle));
  if (focused == 1) {
    contentStyle.color = styles.colors.fg;
    contentStyle.fontWeight = "bold";
  } else if (visible == 1) {
    contentStyle.color = styles.colors.fg;
  }
  return (
    <div style={contentStyle}>
      {focused ? "[" : <span>&nbsp;</span> }
      {app}
      {focused ? "]" : <span>&nbsp;</span> }
    </div>
  );
};


const render = ({ output }) => {
  if (typeof output === "undefined") return null;

  const windows = [];

  output.forEach(function(window) {
    windows.push(renderWindow(window.app, window.focused, window.visible));
  });
  return (
    <div style={containerStyle}>
      {windows}
    </div>
  );
};

export default render;
