import "../../assets/stylesheets/collections.css";
import "../../assets/stylesheets/adminCards.css";
import { useLazyQuery, useQuery } from "@apollo/client";
import { ALL_GAMES, FIND_CARDS, GET_DEFAULT_GAME } from "../../graphQL/queries";
import Card from "../../components/Card";
import { CardType, GameType } from "../../types/schemaTypes";
import AdminHeader from "../../components/AdminHeader";
import CardManager from "../../components/CardManager";
import { Button } from "react-bootstrap";
import { sortCardsBy } from "../../utilities/cardsUtilities";
import { useEffect, useState } from "react";

function Cards(): JSX.Element {
  const { data, loading } = useQuery(FIND_CARDS);
  const [cards, setCards] = useState<CardType[]>([]);

  const [sorter, setSorter] = useState("rarity");

  const allGames = useQuery(ALL_GAMES);
  const status = useQuery(GET_DEFAULT_GAME);
  
  const [findCards, result] = useLazyQuery(FIND_CARDS);

  useEffect(() => {
    if(!loading && !result.data){
      setCards(data.findCards.filter((c:CardType) => c.game))
    }
    
    if(!result.loading && result.data){
      setCards(result.data.findCards.filter((c:CardType) => c.game))
    }
  }, [data, loading, result])
  
  const [game, setGame] = useState("");
  const changeGame = (gameId: string) => {
    setGame(gameId);
    findCards({variables: {gameId}});
  };

  return (
    <>
      <AdminHeader />
      <h1 className="text-uppercase font-weight-bold text-center mt-4">
        Gestor de Cartas
      </h1>
      <div className="cardOptions">
        <div className="raritySelect">
          <p>Ordenar por:</p>
          <select
            value={sorter}
            onChange={({ target }) => setSorter(target.value)}
          >
            <option value="rarity">Rareza</option>
            <option value="name">Nombre</option>
          </select>
          <label htmlFor="">Juego</label>
          <select
            value={game}
            onChange={({ target }) => changeGame(target.value)}
          >
            <option key={0} value={0}>
              {"Mostrar Todos"}
            </option>
            {!allGames.loading &&
              !status.loading &&
              allGames.data.allGames.map(
                (game: GameType) =>
                  game.name === status.data.getStatus.appDefaultGameName && (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  )
              )}
            {!allGames.loading &&
              !status.loading &&
              allGames.data.allGames.map(
                (game: GameType) =>
                  game.name !== status.data.getStatus.appDefaultGameName && (
                    <option key={game.id} value={game.id}>
                      {game.name}
                    </option>
                  )
              )}
          </select>
        </div>
        <Button onClick={() => (window.location.href = "cards/createCard")}>
          Crear Carta
        </Button>
      </div>
      <div className="cardsPanel">
        <div className="cardsContainer">
          {!loading &&
            sortCardsBy(cards, sorter).map((card: CardType) => (
              card.game && <CardManager key={card.id} cardId={card.id}>
                <Card data={card} />
              </CardManager>
            ))}
        </div>
      </div>
    </>
  );
}

export default Cards;
