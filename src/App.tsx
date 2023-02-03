import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loading from "./views/complements/Loading";
import CreateCard from "./views/admin/CreateCard";
const Home = lazy(() => import("./views/general/Home"));
const Collections = lazy(() => import("./views/general/Collections"));
const Help = lazy(() => import("./views/general/Help"));
const Login = lazy(() => import("./views/general/Login"));
const Register = lazy(() => import("./views/general/Register"));
const Not = lazy(() => import("./views/complements/Not"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/collections" element={<Collections />}></Route>
          <Route path="/help" element={<Help />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register/:username/" element={<Register />}></Route>
          <Route path="/register" element={<Register />}></Route>

          <Route path="/admin/createCard" element={<CreateCard />}></Route>
          <Route path="*" element={<Not />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
