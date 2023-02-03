import Header from "../../components/Header";
import "../../assets/stylesheets/collections.css";
import { useQuery } from "@apollo/client";
import { ALL_CARDS } from "../../graphQL/queries";
import Card from "../../components/Card";
import { CardType } from "../../types/schemaTypes";

function Collections(): JSX.Element {
  const { data, loading } = useQuery(ALL_CARDS);

  return (
    <>
      <Header />
      <h1 className="text-uppercase font-weight-bold text-center mt-4">
        Colecciones
      </h1>
      <h2>Sobres</h2>
      <h2>Cartas</h2>
      <div className="cardsPanel">
        <div className="cardsContainer">
          {!loading &&
            data.allCards.map((card: CardType) => (
              <Card key={card.id} data={card} />
            ))}
        </div>
      </div>
    </>
  );
}

export default Collections;
