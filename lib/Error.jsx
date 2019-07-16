const style = {
  color: "#AF5F5F"
};

const render = ({ msg, side }) => {
  if (typeof msg === "undefined") return null;
  return <div style={style}>{msg}</div>;
};

export default render;
