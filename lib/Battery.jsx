import styles from "./styles.jsx";

const render = ({ output }) => {
  return (
    <div>
      <div>
        <span>{output.charging ? "+" : " "}</span>
        <span
          style={output.percentage < 20 ? { color: styles.colors.red } : null}
        >
          {output.percentage}% ({output.remaining})
        </span>
      </div>
    </div>
  );
};

export default render;
