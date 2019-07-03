import { container, content } from "./style.jsx";

const renderDesktop = (index, desktop, active) => {
  let contentStyle = JSON.parse(JSON.stringify(content));
  if (desktop === active) {
    contentStyle.color = "#FFFFFF";
  }
  return <div style={contentStyle}>{desktop}</div>;
};

const render = ({ output }) => {
  if (typeof output === "undefined") return null;

  const app = output.app;
  const desktops = [];
  for (let num = output.end; num >= output.start; --num) {
    desktops.push(renderDesktop(num - output.start + 1, num, output.active));
  }

  return (
    <div style={container}>
      {desktops}
      <div style={{ gridColumnStart: "-1" }}>{app}</div>
    </div>
  );
};

export default render;
