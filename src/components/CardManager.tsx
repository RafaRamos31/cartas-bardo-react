import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { Accordion, Button, Modal, useAccordionButton } from "react-bootstrap";
import "../assets/stylesheets/cardManager.css";
import { DELETE_CARD } from "../graphQL/mutations";

type Props = {
  cardId?: string;
  children: JSX.Element;
};

type ToggleProps = {
  eventKey: string;
};

type DeleteProps = {
  children: JSX.Element;
  cardId: string;
};

function CustomToggle(toggleProps: ToggleProps) {
  const decoratedOnClick = useAccordionButton(toggleProps.eventKey);

  return (
    <button className="toggler" type="button" onClick={decoratedOnClick}>
      <i className="icon bi bi-gear-fill"></i>
    </button>
  );
}

function DeleteButton(deleteProps: DeleteProps) {
  const [deleteCard, result] = useMutation(DELETE_CARD)
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleConfirm = (cardId: string) => {
    deleteCard({variables: {cardId}})
  }

  useEffect(() => {
    if (result.data){
      window.location.reload()
    }
  }, [result.data])

  return (
    <>
      <Button onClick={handleShow} variant="danger">ELIMINAR</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Carta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Quieres eliminar esta carta?</p>
          {deleteProps.children}
          <p>Esta acción no puede deshacerse.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={() => handleConfirm(deleteProps.cardId)}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function CardManager(props: Props) {
  return (
    <div>
      {props.children}
      <Accordion className="options-tab">
        <Accordion.Item eventKey="0">
          <CustomToggle eventKey="0"></CustomToggle>
          <Accordion.Body className="buttons">
            <Button
              onClick={() => {
                window.location.href = `cards/updateCard/${props.cardId}`;
              }}
            >
              MODIFICAR
            </Button>
            {props.cardId && <DeleteButton cardId={props.cardId}>{props.children}</DeleteButton>}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}

export default CardManager;
