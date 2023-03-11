import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import Loading from "./views/complements/Loading";

const Home = lazy(() => import("./views/general/Home"));
const Collections = lazy(() => import("./views/general/Collections"));
const Help = lazy(() => import("./views/general/Help"));
const Login = lazy(() => import("./views/general/Login"));
const Register = lazy(() => import("./views/general/Register"));

const AdminMenu = lazy(() => import("./views/admin/AdminMenu"));
const Cards = lazy(() => import("./views/admin/Cards"));
const CreateCard = lazy(() => import("./views/admin/CreateCard"));
const UpdateCard = lazy(() => import("./views/admin/UpdateCard"));
const Games = lazy(() => import("./views/admin/Games"));
const LootBags = lazy(() => import("./views/admin/LootBags"));
const CreateLootbag = lazy(() => import("./views/admin/CreateLootbag"));

const Not = lazy(() => import("./views/complements/Not"));

function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path="collections" element={<Collections />}></Route>
          <Route path="help" element={<Help />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register/:usercode" element={<Register />}></Route>
          <Route path="admin" element={<AdminMenu />}></Route>
          <Route path="admin/cards" element={<Cards />}></Route>
          <Route path="admin/cards/createCard" element={<CreateCard />}></Route>
          <Route path="admin/cards/updateCard/:cardId" element={<UpdateCard />}></Route>
          <Route path="admin/cards/*" element={<Not />}></Route>
          <Route path="admin/games" element={<Games />}></Route>
          <Route path="admin/lootbags" element={<LootBags />}></Route>
          <Route path="admin/lootbags/createLootbag" element={<CreateLootbag />}></Route>
          <Route path="admin/*" element={<Not />}></Route>
          <Route path="*" element={<Not />}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
