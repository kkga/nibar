import { errorContent } from "./style.jsx";

const render = ({ msg, side }) => {
  if (typeof msg === "undefined") return null;
  return <div style={errorContent}>{msg}</div>;
};

export default render;
