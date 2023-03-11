import "../assets/stylesheets/loot-frame.css";
import { LootbagType } from "../types/schemaTypes";
import Lootbag from "./Lootbag";
import channelPoints from "../assets/images/channel-point.png"
import bits from "../assets/images/bits.png"

type Props = {
  data: LootbagType
}

function LootbagFrame(props: Props) {
  return (
    <div className="frame">
      <div className="name">{props.data.name}</div>
      <Lootbag data={props.data}></Lootbag>
      <div className="prices">
        <div className="channel-points">
          <img className="price-icon" src={channelPoints} alt="channel points" />
          {props.data.channelPoints ? props.data.channelPoints : "--"}
        </div>
        <div className="bits">
          <img className="price-icon" src={bits} alt="bits" />
          {props.data.bits ? props.data.bits : "--"}
        </div>
      </div>
    </div>
  );
}

export default LootbagFrame;
