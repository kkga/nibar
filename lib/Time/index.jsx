import { container, arrow, content } from './style.jsx';

const render = ({output}) => {
  return (
    <div style={container}>
      <div style={arrow}/>
      <div style={content}>
        <i class="fas fa-clock"/>&nbsp;{output}
      </div>
    </div>
  )
}

export default render
