const render = ({ output }) => {
  if (typeof output === "undefined") return null;
  const usedMemory = output.total - output.free;
  const memoryConsumption = Math.round((output.free / output.total) * 100.0);
  return (
    <div>
      mem&nbsp;
      {memoryConsumption}%
    </div>
  );
};

export default render;
