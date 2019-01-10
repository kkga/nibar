import { container, arrow, content } from './style.jsx';

const displayIcon = (batteryPercentage, isCharging) => {
  if (isCharging === true) {
    return 'fa-bolt';
  } else if (batteryPercentage < 20) {
    return 'fa-battery-empty';
  } else if (batteryPercentage < 40) {
    return 'fa-battery-quarter';
  } else if (batteryPercentage < 60) {
    return 'fa-battery-half';
  } else if (batteryPercentage < 80) {
    return 'fa-battery-three-quarters';
  } else {
    return 'fa-battery-full';
  }
}

const render = ({output}) => {
  if (typeof output === 'undefined') return null;
  const batteryIcon = displayIcon(output.percentage, output.charging);
  const iconClasses = `fas ${batteryIcon}`;
  return (
    <div style={container}>
      <div style={arrow}/>
      <div style={content}>
        <i class={iconClasses}/>&nbsp;{output.percentage}%
      </div>
    </div>
  )
}

export default render
