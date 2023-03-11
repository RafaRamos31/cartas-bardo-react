import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from "@apollo/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import "./assets/stylesheets/global-styles.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const getAuth = () => {
  const token = localStorage.getItem('loot-app-user-token')
  return token ? `bearer ${token}` : null
}

// eslint-disable-next-line
const GRAPHQL_SERVER = process.env.REACT_APP_BACKEND_URL + '/graphql'
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      authorization: getAuth()
    },
    //uri: GRAPHQL_SERVER
    uri: "http://localhost:4000/graphql",
  }),
});

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
