import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Accordion, Button, useAccordionButton } from "react-bootstrap";
import "../assets/stylesheets/game.css";
import { CREATE_GAME, DELETE_GAME, UPDATE_GAME } from "../graphQL/mutations";
import { GameType } from "../types/schemaTypes";

type Props = {
  data: GameType;
  index: number;
};

function Game(props: Props) {
  const [id, setId] = useState(props.data.id);
  const [name, setName] = useState(props.data.name);
  const [storedName, setStoredName] = useState(props.data.name);
  const [iconURL, setIconURL] = useState(props.data.iconURL ? props.data.iconURL : "");
  const [storedIconURL, setStoredIconURL] = useState(props.data.iconURL ? props.data.iconURL : "");
  const [editing, setEditing] = useState(false);

  const decoratedOnClick = useAccordionButton(props.index+"", () => setEditing(!editing));

  useEffect(() => {
    if (!editing) {
      setName(storedName);
      setIconURL(storedIconURL);
    }
  }, [editing, storedName, storedIconURL]);

  const [createGame, createResult] = useMutation(CREATE_GAME);
  const [updateGame, updateResult] = useMutation(UPDATE_GAME);
  const [deleteGame, deleteResult] = useMutation(DELETE_GAME);

  const saveChanges = (event: React.MouseEvent) => {
    setStoredName(name);
    setStoredIconURL(iconURL);
    id.length < 5 ? createGame({variables: {name, iconUrl:iconURL !== "" ? iconURL : null}}) : updateGame({variables: {gameId: id, name, iconUrl:iconURL}})
    decoratedOnClick(event)
  };

  useEffect(() => {
    if (!createResult.loading && createResult.data) {
      setId(createResult.data.createGame.id)
    }
  }, [createResult, updateResult]);

  const RemoveGame = () => {
    deleteGame({variables: {gameId: id}})
  };

  useEffect(() => {
    if (!deleteResult.loading && deleteResult.data) {
      window.location.reload()
    }
  }, [deleteResult]);

  return (
    <Accordion.Item eventKey={props.index+""}>
        <div className="main">
          <div className="game-info">
            <img className="circle" src={`${iconURL}`} alt={name} />
            <input
              type="text"
              value={name}
              disabled={!editing}
              onChange={({ target }) => setName(target.value)}
            />
          </div>
          <div className="main-buttons">
            <button
              className="toggler"
              type="button"
              onClick={decoratedOnClick}
            >
              <i className="bi bi-pencil-square"></i>
            </button>
            <button className="toggler" type="button" onClick={RemoveGame}>
              <i className="bi bi-trash3-fill"></i>
            </button>
          </div>
        </div>
        <Accordion.Collapse eventKey={props.index+""} className="buttons" onExit={() => setEditing(false)}>
          <>
            <input
              type="text"
              value={iconURL}
              onChange={({ target }) => setIconURL(target.value)}
            />
            <Button onClick={saveChanges}>
              <i className="bi bi-check-circle-fill"></i>
            </Button>
            <Button variant="danger" onClick={decoratedOnClick}>
              <i className="bi bi-x-circle-fill"></i>
            </Button>
          </>
        </Accordion.Collapse>
        </Accordion.Item>
  );
}

export default Game;
