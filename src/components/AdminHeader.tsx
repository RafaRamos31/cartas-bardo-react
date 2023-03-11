import "../assets/stylesheets/header.css";
import icon from "../assets/images/icono.svg";
import ToggleButton from "./ToggleButton";

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-light app-nav">
      <div className="container-fluid">
        <a className="link" href="/admin">
          <div className="d-flex align-items-center justify-content-center">
            <img
              className="navbar-brand"
              src={icon}
              width="50"
              alt="Logo de la Pagina Web"
            />
            <span className="text-uppercase font-weight-bold link">
              Las Bardo Cartas - Menú Administrativo
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
            <li className="nav-item">
              <a className="link" href="/admin/cards">
                <span>Cartas</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="link" href="/admin/lootbags">
                <span>LootBags</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="link" href="/admin/games">
                <span>Juegos</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="link" href="/admin/config">
                <span>Configuracion</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="link" href="/">
                <span>Volver al Menú de Usuario</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
