import Header from "../../components/Header";
import "../../assets/stylesheets/login.css";
import logo from "../../assets/images/twitch-logo.png";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../graphQL/mutations";

function Login(): JSX.Element {
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
    navigator.clipboard.writeText("!register");
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Comando copiado al portapapeles.
    </Tooltip>
  );

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  // eslint-disable-next-line
  const [token, setToken] = useState("")
  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (result.data){
      const {value: token} = result.data.login
      setToken(token)
      localStorage.setItem('loot-app-user-token', token)
      window.location.href = "/";
    }
  }, [result.data])
  

  const handleSubmit = (event: any) => {
    event.preventDefault()
    login({variables: {username, password}}).catch(error => {
      console.log(error.message)
    })
  }

  return (
    <>
      <Header />
      <h1 className="text-uppercase font-weight-bold text-center mt-4">
        Accede a tu Cuenta
      </h1>
      <div className="d-flex align-items-center justify-content-center">
        <div className="form-container shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                Usuario
              </label>
              <input type="text" className="form-control" id="user" value={username} onChange={({target}) => setUsername(target.value)}/>
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                Contraseña
              </label>
              <input type="password" className="form-control" id="pass" value={password} onChange={({target}) => setPassword(target.value)}/>
            </div>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-danger">
                ENVIAR
                <i className="icon bi bi-box-arrow-in-right"></i>
              </button>
            </div>
          </form>
          <div className="foot-message">
            <p>
              ¿Primera vez por aquí? Crea una cuenta con tu usuario de Twitch,
              pegando el siguiente comando en el chat:
            </p>
            <div className="command-container">
              <span>
                <img src={logo} alt="Logo Twitch" />
                !register
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;