import Header from "../../components/Header";
import "../../assets/stylesheets/login.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_DECRYPTED_USERNAME } from "../../graphQL/queries";
import { LOGIN, REGISTER } from "../../graphQL/mutations";
import { Toast, ToastContainer } from "react-bootstrap";
import { setLogin } from "../../utilities/loginUtilities";

function Register(): JSX.Element {
  const { usercode } = useParams();
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")

  const { data, loading } = useQuery(GET_DECRYPTED_USERNAME, {variables:{usercode}});
  useEffect(() => {
    if(!loading) setUsername(data.decryptUsername)
  }, [data, loading])

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [register, registerResult] = useMutation(REGISTER);
  const [login, loginResult] = useMutation(LOGIN);

  useEffect(() => {
    if (registerResult.data) {
      login({variables: {username, password}}).catch(error => {
        setErrorMessage(error.message);
        setShowError(true);
      })
    }
    // eslint-disable-next-line
  }, [registerResult.data]);
  
  const handleSubmit = (event: any) => {
    event.preventDefault();
    if(password !== passwordConfirm){
      setErrorMessage("Las contraseñas no coinciden");
      setShowError(true);
      return
    }

    register({
      variables: {
        username,
        password
      },
    }).catch((error) => {
      setErrorMessage(error.message);
      setShowError(true);
    });
  };

  useEffect(() => {
    if (loginResult.data){
      const {value: token} = loginResult.data.login
      setLogin(token)
    }
  }, [loginResult.data])
  



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
      </ToastContainer>
      <h1 className="text-uppercase font-weight-bold text-center mt-4">
        ¡BIENVENIDO!
      </h1>
      <div className="d-flex align-items-center justify-content-center">
        <div className="form-container shadow-lg">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="user" className="form-label">
                Usuario
              </label>
              <input
                type="text"
                className="form-control"
                id="user"
                disabled
                value={username}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="pass" className="form-label">
                Contraseña
              </label>
              <input type="password" className="form-control" id="pass"  value={password} onChange={({target}) => setPassword(target.value)} required/>
            </div>
            <div className="mb-3">
              <label htmlFor="confirm-pass" className="form-label">
                Confirmar Contraseña
              </label>
              <input
                type="password"
                className="form-control"
                id="confirm-pass"
                value={passwordConfirm} onChange={({target}) => setPasswordConfirm(target.value)}
                required
              />
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
