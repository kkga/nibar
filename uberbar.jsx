import Time from './lib/Time/index.jsx';
import Battery from './lib/Battery/index.jsx';
import { bar } from './lib/style.jsx';
import parse from './lib/parse.jsx';

export const refreshFrequency = 100

export const command = './uberbar/status.sh'

export const render = ({output}) => {
  const data = parse(output);
  return (
    <div style={bar}>
      <link href="/uberbar/common/css/all.css" rel="stylesheet"/>
      <Battery output={data.battery}/>
      <Time output={data.time}/>
    </div>
  )
}

export default null
