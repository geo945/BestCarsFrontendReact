import { useHistory } from "react-router-dom";

export const urls = {
    loginPage: "/login",
    registerPage: "/register",
}

export function RouteTo(pageUrl: string){
    const history = useHistory();
    history.push(pageUrl);
}