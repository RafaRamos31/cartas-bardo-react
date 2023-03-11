import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "../assets/stylesheets/lootbag.css";
import { LootbagType } from "../types/schemaTypes";

type Props = {
  data: LootbagType;
};

type FixedCard = {
  cardType: string;
  quantity: number;
};

type RarityProps = {
  data: FixedCard;
};

type SizeProps = {
  totalCards: number;
};

function Lootbag(props: Props) {
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

  function SizeIcon(props: SizeProps) {
    const size = props.totalCards
    if (size <= 5){
      return (
        <div property="XS" className="size-icon circle">XS</div>
      );
    }
    if (size <= 10){
      return (
        <div property="S" className="size-icon circle">S</div>
      );
    }
    if (size <= 15){
      return (
        <div property="M" className="size-icon circle">M</div>
      );
    }
    if (size <= 20){
      return (
        <div property="L" className="size-icon circle">L</div>
      );
    }
    if (size <= 35){
      return (
        <div property="XL" className="size-icon circle">XL</div>
      );
    }
    return (
      <div property="XXL" className="size-icon circle">XXL</div>
    );
  }

  function RarityIcon(props: RarityProps) {
    if(props.data.quantity<1) return null
    return (
      <img
        className="rarity-icon"
        src={require(`../assets/images/${props.data.cardType}_icon.png`)}
        alt=""
      />
    );
  }

  return (
    <div className="loot-body">
      <div className="loot-container">
        <div className="upper-icons">
          <div className="game-icon">
            {props.data.fixedGame &&
              printGame(
                props.data.fixedGame.name,
                props.data.fixedGame.iconURL
              )}
          </div>
          <SizeIcon totalCards={props.data.totalCards}></SizeIcon>
        </div>
        <span className="main-orb" style={{backgroundColor: props.data.color}}>?</span>
        <div className="fixed-cards-row">
          {props.data.fixedCards &&
            props.data.fixedCards.map((fc: FixedCard, index:number) => (
              <RarityIcon key={index} data={fc}></RarityIcon>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Lootbag;
