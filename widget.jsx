import Time from './lib/Time/index.jsx';
import Battery from './lib/Battery/index.jsx';
import Cpu from './lib/Cpu/index.jsx';
import Memory from './lib/Memory/index.jsx';
import Hdd from './lib/Hdd/index.jsx';
import Wifi from './lib/Wifi/index.jsx';
import Desktop from './lib/Desktop/index.jsx';
import { bar } from './lib/style.jsx';
import parse from './lib/parse.jsx';

export const refreshFrequency = 100

export const command = './uberbar/status.sh'

export const render = ({output}) => {
  const data = parse(output);
  return (
    <div style={bar}>
      <link href="/uberbar/common/css/all.css" rel="stylesheet"/>
			<Desktop output={data.desktop}/>
			<Wifi output={data.wifi}/>
			<Hdd output={data.hdd}/>
			<Memory output={data.memory}/>
			<Cpu output={data.cpu}/>
      <Battery output={data.battery}/>
      <Time output={data.time}/>
    </div>
  )
}

export default null
