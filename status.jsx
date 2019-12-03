import { styled, run } from "uebersicht";

const colors = {
  background: "transparent",
  text: "rgba(255,255,255,0.75)"
};

const execute = (action, interval) => {
  action();

  setInterval(action, interval);
};

export const refreshFrequency = false;

export const command = dispatch => {
  execute(() => dispatch({ date: new Date() }), 60000);

  execute(() => {
    run(
      `pmset -g batt | egrep '([0-9]+\%).*' -o --colour=auto | cut -f1 -d'%'`
    ).then(battery => dispatch({ battery: parseInt(battery, 10) }));
  }, 60000);

  execute(() => {
    run(`pmset -g batt | grep "'.*'" | sed "s/'//g" | cut -c 18-19`).then(
      power => dispatch({ power: power.trim() })
    );
  }, 5000);

  execute(() => {
    run(`top -l 1 | grep -E "^CPU"`).then(usage => {
      const values = usage
        .replace(/^CPU usage:/, "")
        .split(",")
        .map(val => parseInt(val, 10));

      dispatch({ cpu: values[0] + values[1] });
    });
  }, 60000);

  execute(() => {
    run(
      `/System/Library/PrivateFrameworks/Apple80211.framework/Resources/airport -I | awk -F: '/ SSID/{print $2}'`
    ).then(wifi => dispatch({ wifi }));
  }, 60000);

};

export const updateState = (data, previousState) => ({
  ...previousState,
  ...data
});

const Panel = styled("div")`
  display: grid;
  grid-auto-flow: column;
  align-items: center;
  grid-gap: 16px;
  padding: 0 12px;
  font-family: "SF Mono", sans-serif;
  font-weight: 500;
  font-size: 11px;
  line-height: 20px;
  color: ${colors.text};
  fill: currentColor;
`;

const Item = styled("button")`
  appearance: none;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: inherit;
  font: inherit;
`;

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const render = ({ space, date, cpu, battery = 0, power, wifi }) => {
  return (
    <Panel>
      <Item onClick={() => run('open -a "Activity Monitor"')}>􀍽 {cpu}%</Item>
      <Item>􀙇 {wifi}</Item>
      <Item>􀒘 {battery}%</Item>
      <Item>
        􀉉 {date.getDate()} {days[date.getDay()]}{" "}
        {("0" + date.getHours()).slice(-2)}:
        {("0" + date.getMinutes()).slice(-2)}
      </Item>
    </Panel>
  );
};

export const className = `
  top: 0px;
  right: 0px;
`;
