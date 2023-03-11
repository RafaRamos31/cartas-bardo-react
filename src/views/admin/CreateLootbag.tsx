import "../../assets/stylesheets/createCard.css";
import { useEffect, useState } from "react";
import { GameType } from "../../types/schemaTypes";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_GAMES, GET_DEFAULT_GAME } from "../../graphQL/queries";
import { CREATE_LOOTBAG } from "../../graphQL/mutations";
import { Button, Modal, OverlayTrigger, Toast, ToastContainer, Tooltip } from "react-bootstrap";
import AdminHeader from "../../components/AdminHeader";
import LootbagFrame from "../../components/LootbagFrame";

type FixedCard = {
  cardType: string,
  quantity: number
}

function CreateLootbag(): JSX.Element {
  const [command, setCommand] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Comando copiado al portapapeles.
    </Tooltip>
  );

  const requestClip = () => {
    navigator.permissions
      .query({ name: "persistent-storage" })
      .then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          sendCommand();
        }
      });
  };

  const sendCommand = () => {
    navigator.clipboard.writeText(command);
  };

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [color, setColor] = useState("");
  const [totalCards, setTotalCards] = useState(1);
  const [channelPoints, setChannelPoints] = useState(0);
  const [bits, setBits] = useState(0);
  const [fixedGame, setGame] = useState<GameType>();

  const [fixedCommon, setFixedCommon] = useState(0);
  const [fixedRare, setFixedRare] = useState(0);
  const [fixedEpic, setFixedEpic] = useState(0);
  const [fixedLegendary, setFixedLegendary] = useState(0);
  const [fixedUnique, setFixedUnique] = useState(0);

  
  const changeGame = (gameId: string) => {
    const game = data.allGames.filter((game: GameType) => game.id === gameId);
    setGame(game[0]);
  };

  const { data, loading } = useQuery(ALL_GAMES);

  let  lootbagData = {
    name,
    description,
    color,
    totalCards,
    fixedGame,
    channelPoints,
    bits,
    fixedCards:[
      {
        cardType: "COMMON",
        quantity: fixedCommon
      },
      {
        cardType: "RARE",
        quantity: fixedRare
      },
      {
        cardType: "EPIC",
        quantity: fixedEpic
      },
      {
        cardType: "LEGENDARY",
        quantity: fixedLegendary
      },
      {
        cardType: "UNIQUE",
        quantity: fixedUnique
      }
    ]
  };

  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [createLootbag, result] = useMutation(CREATE_LOOTBAG);

  useEffect(() => {
    if (result.data) {
      setCommand(result.data.createLootBag.twitchCommand)
      handleShow()
    }
  }, [result.data]);

  const handleSubmit = (event: any) => {
    let fixedCards: FixedCard[] = [];
    lootbagData.fixedCards.forEach((e) => {
      if(e.quantity>0) fixedCards = fixedCards.concat(e)
    })
    event.preventDefault();
    createLootbag({
      variables: {
        name: lootbagData.name,
        description: lootbagData.description,
        totalCards: lootbagData.totalCards,
        color: lootbagData.color,
        fixedGameId: lootbagData.fixedGame?.id,
        fixedCards,
        channelPoints: lootbagData.channelPoints>0 ? lootbagData.channelPoints: null,
        bits: lootbagData.bits>0 ? lootbagData.bits: null
      },
    }).catch((error) => {
      setErrorMessage(error.message);
      setShowError(true);
    });
  };

  const status = useQuery(GET_DEFAULT_GAME)

  return (
    <>
      <AdminHeader />
      <ToastContainer position="bottom-end" containerPosition="absolute">
        <Toast
          bg="danger"
          onClose={() => setShowError(false)}
          show={showError}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
        <Toast
          bg="success"
          onClose={() => setShowMessage(false)}
          show={showMessage}
          delay={5000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Completado</strong>
          </Toast.Header>
          <Toast.Body>Carta agregada exitosamente</Toast.Body>
        </Toast>
      </ToastContainer>
      <h1 className="text-uppercase font-weight-bold text-center mt-4">
        Creador de Orbes
      </h1>
      <div className="creatorContainer">
        <div className="column">
          <label htmlFor="">Nombre del Orbe</label>
          <input
            className="name"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <label htmlFor="">Descripcion</label>
          <textarea cols={30} rows={10} value={description} onChange={({ target }) => setDescription(target.value)}></textarea>
          <label htmlFor="">Total de Cartas</label>
          <input
            type="number"
            value={totalCards}
            onChange={({ target }) =>
              setTotalCards(Number.parseInt(target.value))
            }
            min={1}
          />
          <label htmlFor="">Puntos del canal</label>
          <input
            type="number"
            value={channelPoints}
            onChange={({ target }) =>
              setChannelPoints(Number.parseInt(target.value))
            }
            min={0}
          />
          <label htmlFor="">Bits</label>
          <input
            type="number"
            value={bits}
            onChange={({ target }) =>
              setBits(Number.parseInt(target.value))
            }
            min={0}
          />
        </div>
        <div className="column card-column">
          <LootbagFrame data={lootbagData} />
          <input type="submit" onClick={handleSubmit} value="CREAR ORBE" />
        </div>
        <div className="column">
          <label htmlFor="">Contiene cartas de:</label>
          <select
            value={fixedGame?.id}
            onChange={({ target }) => changeGame(target.value)}
          >
            <option key={0} value={0}>
              {"Todos los Juegos"}
            </option>
            {!loading && !status.loading &&
              data.allGames.map((game: GameType) => (
                game.name !== status.data.getStatus.appDefaultGameName && 
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
          </select>
          <label htmlFor="">Color</label>
          <input
            type="color"
            value={color}
            onChange={({ target }) =>
              setColor(target.value)
            }
            min={0}
          />
          <label htmlFor="">Comunes</label>
          <input
            type="number"
            value={fixedCommon}
            onChange={({ target }) =>
              setFixedCommon(Number.parseInt(target.value))
            }
            min={0}
          />
          <label htmlFor="">Raras</label>
          <input
            type="number"
            value={fixedRare}
            onChange={({ target }) =>
              setFixedRare(Number.parseInt(target.value))
            }
            min={0}
          />
          <label htmlFor="">Epicas</label>
          <input
            type="number"
            value={fixedEpic}
            onChange={({ target }) =>
              setFixedEpic(Number.parseInt(target.value))
            }
            min={0}
          />
          <label htmlFor="">Legendarias</label>
          <input
            type="number"
            value={fixedLegendary}
            onChange={({ target }) =>
              setFixedLegendary(Number.parseInt(target.value))
            }
            min={0}
          />
          <label htmlFor="">Unicas</label>
          <input
            type="number"
            value={fixedUnique}
            onChange={({ target }) =>
              setFixedUnique(Number.parseInt(target.value))
            }
            min={0}
          />
        </div>
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        dialogClassName="modal-90w"
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Orbe creado exitosamente</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Vincula el siguiente codigo a una recompensa de Twitch, usando StreamElements o IsaiahCreati.
          <div className="command-container">
              <span>
                {command}
              </span>
              <OverlayTrigger
                placement="top"
                trigger={"click"}
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <button
                  type="button"
                  className="btn btn-light"
                  onClick={requestClip}
                >
                  <i className="bi bi-clipboard-fill"></i>
                </button>
              </OverlayTrigger>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CreateLootbag;
