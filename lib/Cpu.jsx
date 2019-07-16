const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  return <div>{output.loadAverage}</div>;
};

export default render;
