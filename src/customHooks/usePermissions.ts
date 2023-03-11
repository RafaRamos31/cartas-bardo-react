import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CURRENT_USER } from "../graphQL/queries";

export function useValidateRole(validRole: String) {
  const { data, loading } = useQuery(CURRENT_USER);

  useEffect(() => {
    if (!loading && !data.me) {
      window.location.href = "/login";
    }
    if (!loading && data.me && !data.me.roles.includes(validRole)) {
      window.location.href = "/login";
    }
  }, [validRole, data, loading]);
}

export function useGetPermissions() {
  const [isLogged, setLogged] = useState(false)
  const [isAdmin, setAdmin] = useState(false)
  const { data, loading } = useQuery(CURRENT_USER);

  useEffect(() => {
    if (!loading && data.me) {
      setLogged(true)
      if(data.me.roles.includes("ADMIN")){
        setAdmin(true)
      }
    }
  }, [data, loading]);

  return [isLogged, isAdmin]
}
