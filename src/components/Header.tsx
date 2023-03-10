import "../assets/stylesheets/header.css";
import icon from "../assets/images/icono.svg";
import ToggleButton from "./ToggleButton";
import { useGetPermissions } from "../customHooks/usePermissions";
import { useLogout } from "../utilities/loginUtilities";

function Header() {
  const [isLogged, isAdmin] = useGetPermissions();

  return (
    <nav className="navbar navbar-expand-md navbar-light app-nav">
      <div className="container-fluid">
        <a className="link" href="/">
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="navbar-brand"
              src={icon}
              width="50"
              alt="Logo de la Pagina Web"
            />
            <span className="text-uppercase font-weight-bold link">
              Las Bardo Cartas
            </span>
          </div>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-toggler"
          aria-controls="navbar-toggler"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="link navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar-toggler">
          <ul className="navbar-nav d-flex justify-content-center align-items-center">
            <li className="nav-item">
              <ToggleButton />
            </li>
            {isAdmin && (
              <li className="nav-item">
                <a className="link" href="admin">
                  <span>Menú Administrativo</span>
                </a>
              </li>
            )}
            {isLogged && (
              <>
              <li className="nav-item">
                <a className="link" href="redeem">
                  <span>Canjear</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="link" href="mycards">
                  <span>Mis Cartas</span>
                </a>
              </li>
              </>
            )}
            <li className="nav-item">
              <a className="link" href="collections">
                <span>Colecciones</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="link" href="help">
                <span>Ayuda</span>
              </a>
            </li>
            <li className="nav-item">
              {!isLogged ? (
                <a className="link" href="login">
                  <span>Iniciar Sesión</span>
                </a>
              ) : (
                <a className="link" href="/">
                  <span onClick={useLogout}>Cerrar Sesión</span>
                </a>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
