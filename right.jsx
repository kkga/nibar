import Desktop from './lib/Desktop/index.jsx';
import { rightSide } from './lib/style.jsx';
import parse from './lib/parse.jsx';

export const refreshFrequency = 100

export const command = './powerbar/status-right.sh'

export const render = ({output}) => {
  const data = parse(output);
  return (
    <div style={rightSide}>
			<Desktop output={data.desktop}/>
    </div>
  )
}

export default null
