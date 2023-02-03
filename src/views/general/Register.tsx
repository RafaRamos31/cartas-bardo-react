import Header from "../../components/Header";
import "../../assets/stylesheets/login.css";
import { useParams } from "react-router-dom";

function Register(): JSX.Element {
  const {username} = useParams();

  return (
    <>
      <Header />
      <h1 className="text-uppercase font-weight-bold text-center mt-4">
        ¡BIENVENIDO!
      </h1>
      <div className="d-flex align-items-center justify-content-center">
        <div className="form-container shadow-lg">
          <form action="../../controllers/register.jsp" method="GET">
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                Usuario
              </label>
              <input type="text" className="form-control" id="user" disabled value={username}/>
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                Contraseña
              </label>
              <input type="password" className="form-control" id="pass" />
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-pass" className="form-label">
                Confirmar Contraseña
              </label>
              <input type="password" className="form-control" id="confirm-pass" />
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-danger">
                REGISTRARSE
                <i className="icon bi bi-box-arrow-in-right"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
