import { content } from "./style.jsx";

const renderDesktop = (index, desktop, active) => {
  let contentStyle = JSON.parse(JSON.stringify(content));
  contentStyle.left = index * 35 - 42 + "px";
  if (desktop === active) {
    contentStyle.color = "#FFFFAF";
  }
  return (
    <span>
      <div style={contentStyle}>{desktop}</div>
    </span>
  );
};

const render = ({ output }) => {
  if (typeof output === "undefined") return null;

  const desktops = [];
  for (let num = output.end; num >= output.start; --num) {
    desktops.push(renderDesktop(num - output.start + 1, num, output.active));
  }

  return <div>{desktops}</div>;
};

export default render;
