import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { CURRENT_USER } from "../graphQL/queries";
import { UserBasicType } from "../types/schemaTypes";

export function useGetUserInfo() {
  const [user, setUser] = useState<UserBasicType | null>(null)
  const { data, loading } = useQuery(CURRENT_USER);

  useEffect(() => {
    if (!loading && data.me) {
      setUser(data.me)
    }
  }, [data, loading]);

  return user
}
