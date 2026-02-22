import { OnThisPage } from "./my-work/on-this-page";

const items = [
  { id: "introduction", label: "Introduction", level: 1 },
  { id: "installation", label: "Installation", level: 2 },
  { id: "usage", label: "Usage", level: 2 },
  { id: "advanced", label: "Advanced", level: 3 },
];

const PlayGround = () => (
  <div className="">
    <OnThisPage label="On this page" items={items} />
  </div>
);

export default PlayGround;
