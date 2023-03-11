import "../../assets/stylesheets/collections.css";
import "../../assets/stylesheets/adminGames.css";
import { useQuery } from "@apollo/client";
import { ALL_GAMES } from "../../graphQL/queries";
import { GameType } from "../../types/schemaTypes";
import AdminHeader from "../../components/AdminHeader";
import { Accordion, Button } from "react-bootstrap";
import Game from "../../components/Game";
import { useState, useEffect } from "react";

function Games(): JSX.Element {
  const { data, loading } = useQuery(ALL_GAMES);
  const [games, setGames] = useState<GameType[]>([]);

  useEffect(() => {
    if(!loading){
      setGames(data.allGames)
    }

  }, [data, loading])

  const addEmptyGame = () => {
    const newGame: GameType = {
      id: games.length+"", 
      name: "", 
      iconURL: ""
    }
    setGames(games.concat(newGame))
  }

  return (
    <>
      <AdminHeader />
      <h1 className="text-uppercase font-weight-bold text-center mt-4">
        Gestor de Juegos
      </h1>
      <div className="gamesPanel">
        <div className="gamesContainer">
          <Accordion className="options-tab">
            {!loading &&
              games.map((game: GameType, index:number) => (
                <Game key={game.id} data={game} index={index}></Game>
              ))}
          </Accordion>
        </div>
        <Button onClick={addEmptyGame}>Agregar</Button>
      </div>
    </>
  );
}

export default Games;
