import { container, arrow, content } from "./style.jsx";

const updateStyling = (batteryPercentage, isCharging) => {
  let contentStyle = JSON.parse(JSON.stringify(content));
  if (batteryPercentage < 20) {
    contentStyle.color = "#AF5F5F";
  }
  return { contentStyle };
};

const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  const { contentStyle, arrowStyle } = updateStyling(
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
