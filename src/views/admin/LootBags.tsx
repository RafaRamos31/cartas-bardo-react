import "../../assets/stylesheets/collections.css";
import "../../assets/stylesheets/adminCards.css";
import AdminHeader from "../../components/AdminHeader";
import { Button } from "react-bootstrap";
import { useQuery } from "@apollo/client";
import { ALL_LOOTBAGS } from "../../graphQL/queries";
import { LootbagType } from "../../types/schemaTypes";
import LootbagFrame from "../../components/LootbagFrame";

function LootBags(): JSX.Element {

  const {data, loading} = useQuery(ALL_LOOTBAGS)

  return (
    <>
      <AdminHeader />
      <h1 className="text-uppercase font-weight-bold text-center mt-4">
        Gestor de Cofres
      </h1>
      <div className="cardOptions">
        <Button onClick={() => (window.location.href = "lootbags/createLootbag")}>
          Crear Cofre
        </Button>
      </div>
      <div className="lootBags">
        <div className="cardsContainer">
          {
            !loading &&
            data.allLootBags.map((b:LootbagType) => 
            <LootbagFrame key={b.id} data={b}></LootbagFrame>)
          }
        </div>
      </div>
    </>
  );
}

export default LootBags;
