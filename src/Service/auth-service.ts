import { environment } from "../config/config";
import { Person } from "../Model/Person";
import { fetchAndParse } from "../utils/utilFunctions";
import { UserInfo } from "../Model/Person-payload";
import { headers } from "../config/config";

export function userRegister(body: Person): Promise<any>{
    const url = environment.apiBaseUrl + "/person/add";
    return fetchAndParse(url,{method: 'POST', headers: headers, body: JSON.stringify(body) });
}

export function userLogin(body: UserInfo): Promise<any>{
    const url = environment.apiBaseUrl + "/person/login";
    return fetchAndParse(url,{method: 'POST', headers: headers, body: JSON.stringify(body)});
}