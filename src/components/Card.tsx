import "../assets/stylesheets/card.css";
import { CardType } from "../types/schemaTypes";
import CardInfo from "./CardInfo";

type propsCard = {
  data: CardType
}

function Card(props: propsCard) {

  let attributes = {
    stackable: props.data.stackable,
    game: props.data.game,
    fragments: props.data.fragments,
    cooldown: props.data.cooldown
  }

  return (
    
    <>
      <div
        className="cardBody"
        property={`${props.data.rarity}`}
      >
        <div className="title">{props.data.name}</div>
        <div className="imageContainer">
        <img
            className="cardImage"
            src={`${props.data.imageURL}`}
            alt={props.data.name}
          />
        </div>
        <div className="attributes">
          <CardInfo data={attributes} />
        </div>
        <div className="iconContainer">
          <img
            className="rarityIcon"
            src={require(`../assets/images/${props.data.rarity}_icon.png`)}
            alt="rarity"
          />
        </div>
      </div>
    </>
  );
}

export default Card;
