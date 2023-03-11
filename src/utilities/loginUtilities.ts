import { useApolloClient } from "@apollo/client";

export function setLogin(token: string){
    localStorage.setItem('loot-app-user-token', token)
    window.location.href = "/";
}

export function useLogout(){
    localStorage.removeItem('loot-app-user-token')
    const client = useApolloClient()
    client.clearStore()
    window.location.href = "/";
}