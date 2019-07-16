import { container, content } from "./style.jsx";

const renderSpace = (index, active, windows) => {
  let contentStyle = JSON.parse(JSON.stringify(content));
  let hasWindows = windows > 0;
  if (index == active) {
    contentStyle.color = "#FFFFFF";
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

  const app = output.app;
  const type = output.type;
  const spaces = [];

  output.spaces.forEach(function(space) {
    spaces.push(renderSpace(space.index, output.active, space.windows));
  });

  return (
    <div style={container}>
      {spaces} [{type}] {app}
    </div>
  );
};

export default render;
