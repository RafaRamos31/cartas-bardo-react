import { OverlayTrigger, Tooltip } from "react-bootstrap";

type InfoProps = {
  message: String
}

function InfoHover(props: InfoProps) {
  return (
    <OverlayTrigger
      placement="left"
      overlay={<Tooltip id="button-tooltip-2">{props.message}</Tooltip>}
    >
      {({ ref, ...triggerHandler }) => (
        <i
          ref={ref}
          {...triggerHandler}
          className="bi bi-question-circle-fill"
        ></i>
      )}
    </OverlayTrigger>
  );
}

export default InfoHover;