import { container, arrow, arrowLight, content } from './style.jsx';

const renderDesktop = (index, desktop, active) => {
  let contentStyle = JSON.parse(JSON.stringify(content));
	contentStyle.left = (index * 35 - 45) + 'px';
  let arrowStyle = JSON.parse(JSON.stringify(arrow));
	arrowStyle.left = (index * 35 - 10) + 'px';
  let arrowLightStyle = JSON.parse(JSON.stringify(arrowLight));
	arrowLightStyle.left = (index * 35 - 9) + 'px';
	if (desktop === active) {
		contentStyle.background = 'rgba(235, 239, 243, 1)';
		contentStyle.color = 'rgba(76, 86, 106, 1)';
		arrowStyle.borderLeft = '10px solid rgba(235, 239, 243, 1)';
	}
  return (
      <span>
        <div style={contentStyle}>
        {desktop}
        </div>
        <div style={arrowLightStyle}/>
        <div style={arrowStyle}/>
      </span>
  )
}

const render = ({output}) => {
  if (typeof output === 'undefined') return null;
  
  const desktops = [];
  for (let num = output.end; num >= output.start; --num) {
    desktops.push(renderDesktop(num - output.start + 1, num, output.active));
  }
  
  return (
    <div style={container}>
      {desktops}
    </div>
  )
}

export default render
