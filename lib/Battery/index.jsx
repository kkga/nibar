import { container, arrow, content } from "./style.jsx";

const displayIcon = (batteryPercentage, isCharging) => {
  if (isCharging === true) {
    return "fa-bolt";
  } else if (batteryPercentage < 20) {
    return "fa-battery-empty";
  } else if (batteryPercentage < 40) {
    return "fa-battery-quarter";
  } else if (batteryPercentage < 60) {
    return "fa-battery-half";
  } else if (batteryPercentage < 80) {
    return "fa-battery-three-quarters";
  } else {
    return "fa-battery-full";
  }
};

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
        bat&nbsp;
        {output.charging ? "+" : "-"}
        {output.percentage}%
      </div>
    </div>
  );
};

export default render;
