import { container, arrow, content } from './style.jsx';

const render = ({output}) => {
  if (typeof output === 'undefined') return null;
 	const total = output.totalBytes * 512 / 1024 / 1024 / 1024;
	const free = output.freeBytes * 512 / 1024 / 1024 / 1024;
	const used = total - free; 
	return (
    <div style={container}>
      <div style={arrow}/>
      <div style={content}>
        <i class="fas fa-hdd"/>&nbsp;{Math.round(used)}Gi/{Math.round(total)}Gi
      </div>
    </div>
  )
}

export default render
