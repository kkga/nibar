const render = ({ output }) => {
  return (
    <div>
      <div>
        <span style={{ fontWeight: "900" }}>
          {output.charging ? "⚡" : " "}
        </span>
        &nbsp;
        <span style={output.percentage < 20 ? {color: "#AF5F5F"} : null}>
          {output.percentage}%
        </span>
      </div>
    </div>
  );
};

export default render;
