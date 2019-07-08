const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  return <div title={output.ssid}>{output.ssid}</div>;
};

export default render;
