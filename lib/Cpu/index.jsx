const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  return <div>cpu {output.loadAverage}</div>;
};

export default render;
