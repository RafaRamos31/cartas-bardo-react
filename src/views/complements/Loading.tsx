function Loading(): JSX.Element {
  return (
    <div className="modal-dialog modal-dialog-centered">
      <div className="d-flex align-items-center">
        <strong>Cargando...</strong>
        <div
          className="spinner-border ms-auto"
          role="status"
          aria-hidden="true"
        ></div>
      </div>
    </div>
  );
}

export default Loading;
