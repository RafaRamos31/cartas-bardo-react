import Header from "../../components/Header";
import "../../assets/stylesheets/createCard.css";
import Card from "../../components/Card";
import { useEffect, useState } from "react";
import { GameType } from "../../types/schemaTypes";
import { useMutation, useQuery } from "@apollo/client";
import { ALL_GAMES, GET_DEFAULT_GAME } from "../../graphQL/queries";
import { CREATE_CARD } from "../../graphQL/mutations";
import { Toast, ToastContainer } from "react-bootstrap";
import InfoHover from "../../components/InfoHover";

function CreateCard(): JSX.Element {
  const [name, setName] = useState("");
  const [imageURL, setImage] = useState("");
  const [fragments, setFragments] = useState(1);
  const [rarity, setRarity] = useState("COMMON");
  const [command, setCommand] = useState("");
  const [stackable, setStackable] = useState(false);
  const [game, setGame] = useState<GameType>();

  //Limited
  const [isLimited, setIsLimited] = useState(false);
  const [limited, setLimited] = useState<{ existences: number } | undefined>();
  const [existences, setExistences] = useState(1);

  //TimeEffect
  const [effectDays, setEffectDays] = useState(0);
  const [effectHours, setEffectHours] = useState(0);
  const [effectMinutes, setEffectMinutes] = useState(0);
  const [effectSeconds, setEffectSeconds] = useState(0);
  const [hasTimeEffect, setHasTimeEffect] = useState(false);
  const [secondsEffect, setSecondsEffect] = useState(0);

  useEffect(() => {
    setSecondsEffect(effectDays * 86400 + effectHours * 3600 + effectMinutes * 60 + effectSeconds);
  }, [effectDays, effectHours, effectMinutes, effectSeconds]);

  const updateTimeEffect = (hasTimeEffect: boolean) => {
    setHasTimeEffect(hasTimeEffect);
    if (hasTimeEffect) {
      setSecondsEffect(effectDays * 86400 + effectHours * 3600 + effectMinutes * 60 + effectSeconds);
    } else {
      setSecondsEffect(0);
    }
  };

  //Cooldown
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const [cooldown, setCooldown] = useState<
    | {
        cooldownFinishAt: string;
        secondsCooldown: number;
        secondsAfterStack?: number;
      }
    | undefined
  >();
  const [hasCooldown, setHasCooldown] = useState(false);

  /*"
  "secondsAfterStack": null*/

  const changeGame = (gameId: string) => {
    const game = data.allGames.filter((game: GameType) => game.id === gameId);
    setGame(game[0]);
  };

  const updateLimited = (isLimited: boolean) => {
    setIsLimited(isLimited);
    if (isLimited) {
      setLimited({ existences });
    } else {
      setLimited(undefined);
    }
  };

  const updateEffect = (change: string, value: number) => {
    if (isNaN(value)) value = 0;
    switch (change) {
      case "days": {
        setEffectDays(value);
        break;
      }
      case "hours": {
        setEffectHours(value);
        break;
      }
      case "minutes": {
        setEffectMinutes(value);
        break;
      }
      case "seconds": {
        setEffectSeconds(value);
        break;
      }
    }
  };

  const updateTime = (change: string, value: number) => {
    if (isNaN(value)) value = 0;
    switch (change) {
      case "days": {
        setDays(value);
        break;
      }
      case "hours": {
        setHours(value);
        break;
      }
      case "minutes": {
        setMinutes(value);
        break;
      }
      case "seconds": {
        setSeconds(value);
        break;
      }
    }
  };

  const updateCooldown = (hasCooldown: boolean) => {
    setHasCooldown(hasCooldown);
    if (hasCooldown) {
      setCooldown({
        cooldownFinishAt: "",
        secondsCooldown: days * 86400 + hours * 3600 + minutes * 60 + seconds,
        secondsAfterStack: 0,
      });
    } else {
      setCooldown(undefined);
    }
  };

  useEffect(() => {
    setCooldown({
      cooldownFinishAt: "",
      secondsCooldown: days * 86400 + hours * 3600 + minutes * 60 + seconds,
      secondsAfterStack: 0,
    });
  }, [days, hours, minutes, seconds]);

  const { data, loading } = useQuery(ALL_GAMES);

  let cardData = {
    name,
    imageURL,
    rarity,
    fragments,
    command,
    stackable,
    secondsEffect,
    game,
    limited,
    cooldown: hasCooldown ? cooldown : undefined,
  };

  const [showError, setShowError] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [createCard, result] = useMutation(CREATE_CARD);

  useEffect(() => {
    if (result.data) {
      setShowMessage(true);
    }
  }, [result.data]);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createCard({
      variables: {
        name: cardData.name,
        imageURL: cardData.imageURL.length >0 ? cardData.imageURL : null,
        rarity: cardData.rarity,
        fragments: cardData.fragments > 0 ? cardData.fragments : undefined,
        command: cardData.command,
        stackable: cardData.stackable,
        gameId: cardData.game?.id,
        existences: cardData.limited?.existences,
        secondsCooldown: cardData.cooldown?.secondsCooldown,
        secondsEffect: cardData.secondsEffect
      },
    }).catch((error) => {
      setErrorMessage(error.message);
      setShowError(true);
    });
  };

  const status = useQuery(GET_DEFAULT_GAME)

  return (
    <>
      <Header />
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
        Creador de Cartas
      </h1>
      <div className="creatorContainer">
        <div className="column">
          <label htmlFor="">Nombre de la Carta</label>
          <input
            className="name"
            type="text"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
          <label htmlFor="">Rareza</label>
          <select
            value={rarity}
            onChange={({ target }) => setRarity(target.value)}
          >
            <option key={"COMMON"} value="COMMON">
              Común
            </option>
            <option key={"RARE"} value="RARE">
              Rara
            </option>
            <option key={"EPIC"} value="EPIC">
              Épica
            </option>
            <option key={"LEGENDARY"} value="LEGENDARY">
              Legendaria
            </option>
            <option key={"UNIQUE"} value="UNIQUE">
              Única
            </option>
          </select>
          <label htmlFor="">Fragmentos</label>
          <input
            type="number"
            value={fragments}
            onChange={({ target }) =>
              setFragments(Number.parseInt(target.value))
            }
            min={1}
          />
          <label htmlFor="">Juego</label>
          <select
            value={game?.id}
            onChange={({ target }) => changeGame(target.value)}
          >
            <option key={0} value={0}>
              {"Ninguno"}
            </option>
            {!loading && !status.loading &&
              data.allGames.map((game: GameType) => (
                game.name !== status.data.getStatus.appDefaultGameName && 
                <option key={game.id} value={game.id}>
                  {game.name}
                </option>
              ))}
          </select>
          <label htmlFor="">Comando</label>
          <input
            type="text"
            value={command}
            onChange={({ target }) => setCommand(target.value)}
          />
          <label htmlFor="">URL de Imagen</label>
          <input
            type="text"
            value={imageURL}
            onChange={({ target }) => setImage(target.value)}
          />
        </div>
        <div className="column card-column">
          <Card data={cardData} />
          <input type="submit" onClick={handleSubmit} value="CREAR CARTA" />
        </div>
        <div className="column">
        <div className="optional-config">
            <div className="check-flex">
              <InfoHover message='Determina el periodo en que se verán los efectos de la carta. Ej. "Modo emotes por 3 minutos": los 3 minutos van aqui.'></InfoHover>
              <label htmlFor="">Efecto con tiempo</label>
              <input
                type="checkbox"
                checked={hasTimeEffect}
                onChange={({ target }) => updateTimeEffect(target.checked)}
              />
            </div>
            {hasTimeEffect && (
              <>
                <div className="timeInput">
                  <label>D</label>
                  <input
                    type="number"
                    value={effectDays}
                    onChange={({ target }) =>
                      updateEffect("days", Number.parseInt(target.value))
                    }
                    disabled={!hasTimeEffect}
                    min={0}
                  />
                  <label>H</label>
                  <input
                    type="number"
                    value={effectHours}
                    onChange={({ target }) =>
                      updateEffect("hours", Number.parseInt(target.value))
                    }
                    disabled={!hasTimeEffect}
                    min={0}
                  />
                  <label>M</label>
                  <input
                    type="number"
                    value={effectMinutes}
                    onChange={({ target }) =>
                      updateEffect("minutes", Number.parseInt(target.value))
                    }
                    disabled={!hasTimeEffect}
                    min={0}
                  />
                  <label>S</label>
                  <input
                    type="number"
                    value={effectSeconds}
                    onChange={({ target }) =>
                      updateEffect("seconds", Number.parseInt(target.value))
                    }
                    disabled={!hasTimeEffect}
                    min={0}
                  />
                </div>
              </>
            )}
          </div>
          <div className="optional-config">
            <div className="check-flex">
            <InfoHover message='Para permitir que se pueda lanzar mas de una carta al mismo tiempo'></InfoHover>
              <label htmlFor="">Stackeable</label>
              <input
                type="checkbox"
                checked={stackable}
                onChange={({ target }) => setStackable(target.checked)}
              />
            </div>
          </div>
          <div className="optional-config">
            <div className="check-flex">
            <InfoHover message='Reparte copias de esta carta a los usuarios hasta agotar existencias'></InfoHover>
              <label htmlFor="">Limitada</label>
              <input
                type="checkbox"
                checked={isLimited}
                onChange={({ target }) => updateLimited(target.checked)}
              />
            </div>
            {isLimited && (
              <>
                <label htmlFor="">Existencias</label>
                <input
                  className="existences-input"
                  type="number"
                  value={existences}
                  onChange={({ target }) =>
                    setExistences(Number.parseInt(target.value))
                  }
                  min={1}
                  disabled={!isLimited}
                />
              </>
            )}
          </div>
          <div className="optional-config">
            <div className="check-flex">
            <InfoHover message='El tiempo que hay que esperar para volver a lanzar esta misma carta.'></InfoHover>
              <label htmlFor="">Enfriamiento</label>
              <input
                type="checkbox"
                checked={hasCooldown}
                onChange={({ target }) => updateCooldown(target.checked)}
              />
            </div>
            {hasCooldown && (
              <>
                <div className="timeInput">
                  <label>D</label>
                  <input
                    type="number"
                    value={days}
                    onChange={({ target }) =>
                      updateTime("days", Number.parseInt(target.value))
                    }
                    disabled={!hasCooldown}
                    min={0}
                  />
                  <label>H</label>
                  <input
                    type="number"
                    value={hours}
                    onChange={({ target }) =>
                      updateTime("hours", Number.parseInt(target.value))
                    }
                    disabled={!hasCooldown}
                    min={0}
                  />
                  <label>M</label>
                  <input
                    type="number"
                    value={minutes}
                    onChange={({ target }) =>
                      updateTime("minutes", Number.parseInt(target.value))
                    }
                    disabled={!hasCooldown}
                    min={0}
                  />
                  <label>S</label>
                  <input
                    type="number"
                    value={seconds}
                    onChange={({ target }) =>
                      updateTime("seconds", Number.parseInt(target.value))
                    }
                    disabled={!hasCooldown}
                    min={0}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateCard;
