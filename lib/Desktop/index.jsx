import { container, arrow, arrowLight, content } from './style.jsx';

const renderDesktop = (number, active) => {
  let contentStyle = JSON.parse(JSON.stringify(content));
	contentStyle.left = (number * 35 - 45) + 'px';
  let arrowStyle = JSON.parse(JSON.stringify(arrow));
	arrowStyle.left = (number * 35 - 10) + 'px';
  let arrowLightStyle = JSON.parse(JSON.stringify(arrowLight));
	arrowLightStyle.left = (number * 35 - 9) + 'px';
	if (number === active) {
		contentStyle.background = 'rgba(235, 239, 243, 1)';
		contentStyle.color = 'rgba(76, 86, 106, 1)';
		arrowStyle.borderLeft = '10px solid rgba(235, 239, 243, 1)';
	}
  return (
      <span>
        <div style={contentStyle}>
        {number}
        </div>
        <div style={arrowLightStyle}/>
        <div style={arrowStyle}/>
      </span>
  )
}

const render = ({output}) => {
  if (typeof output === 'undefined') return null;
  
  const desktops = [];
  for (let num = output.total; num > 0; --num) {
    desktops.push(renderDesktop(num, output.active));
  }
  
  return (
    <div style={container}>
      {desktops}
    </div>
  )
}

export default render
