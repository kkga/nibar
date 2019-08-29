import styles from "./styles.jsx";

const render = ({ output }) => {
  return (
    <div>
      <div
        style={
          output.percentage < 20 && output.charging == false
            ? { color: styles.colors.red }
            : null
        }
      >
        <span>{output.charging ? "+" : " "}</span>
        <span>
          {output.percentage}% ({output.remaining})
        </span>
      </div>
    </div>
  );
};

export default render;
