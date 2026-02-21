import { CircularText } from "./my-work/circular-text";

const PlayGround = () => (
  <div>
    <CircularText
      text=" ✦ Elixir UI  ✦  Ship Faster ✦  Build Better"
      size="lg"
      speed={12}
      direction="counter-clockwise"
      pauseOnHover
      textColor="#000"
      letterSpacing={2}
      startAngle={-90}
      logoSpeed={4}
      logoUrl="https://raw.githubusercontent.com/elixir-labs-global/ui.elixirlabs.in/main/assets/elixir-ui-logo.svg"
    />
  </div>
);

export default PlayGround;
