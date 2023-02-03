import "../assets/stylesheets/cardInfo.css";
import fragmentsIcon from "../assets/images/fragments_icon.png";
import stackIcon from "../assets/images/stackable_icon.png";
import cooldownIcon from "../assets/images/cooldown_icon.png";
import { getTimeString } from "../utilities/timeUtilities";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

type InfoProps = {
  data: {
    stackable: Boolean;
    fragments: number;
    game?: {
      id: string;
      name: string;
      iconURL?: string;
    };
    cooldown?: {
      cooldownFinishAt: string;
      secondsCooldown: number;
      secondsAfterStack?: number;
    };
  };
};

function CardInfo(props: InfoProps) {
  const printGame = (name: string, iconURL?: string) => {
    iconURL = iconURL ? iconURL : "";
    if (iconURL) {
      return (
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip id="button-tooltip-2">{name}</Tooltip>}
        >
          {({ ref, ...triggerHandler }) => (
            <img
              ref={ref}
              {...triggerHandler}
              className="circle"
              src={`${iconURL}`}
              alt="gameIcon"
            />
          )}
        </OverlayTrigger>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <div className="container">
        <img className="icon" src={fragmentsIcon} alt="" />
        <p>{`${props.data.fragments}`}</p>
      </div>
      <div className="container game">
        {props.data.game &&
          printGame(props.data.game.name, props.data.game.iconURL)}
      </div>
      <div className="container">
        {props.data.stackable && (
          <img className="icon" src={stackIcon} alt="" />
        )}
      </div>
      <div className="container time">
        {props.data.cooldown && (
          <>
            <img className="icon" src={cooldownIcon} alt="" />
            <p>{`${getTimeString(props.data.cooldown.secondsCooldown)}`}</p>
          </>
        )}
      </div>
    </>
  );
}

export default CardInfo;
