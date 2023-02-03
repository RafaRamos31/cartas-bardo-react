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

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    headers: {
      authorization: getAuth()
    },
    uri: 'https://donbardocardsbackend-production.up.railway.app/graphql'
    //uri: "http://localhost:4000/graphql",
  }),
});

root.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);
