const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  return <div>wifi {output.ssid}</div>;
};

export default render;
