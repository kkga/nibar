const updateStyling = (batteryPercentage, isCharging) => {
  if (batteryPercentage < 20) {
    contentStyle.color = "#AF5F5F";
  }
};

const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  const contentStyle = updateStyling(
    output.percentage,
    output.charging
  );
  return (
    <div>
      <div style={contentStyle}>
        <span style={{ fontWeight: "900" }}>
          {output.charging ? "⚡" : " "}
        </span>
        &nbsp;
        {output.percentage}%
      </div>
    </div>
  );
};

export default render;
