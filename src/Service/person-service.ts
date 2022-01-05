import { environment } from "../config/config";
import { Person } from "../Model/Person";
import { headers } from "../config/config";
import {fetchAndParse} from "../utils/utilFunctions";

export async function getAllUsers(): Promise<Person[]>{
    const url = environment.apiBaseUrl + "/person/all";
    return fetchAndParse(url,{method: 'GET', headers: headers});
}

export async function updateUser(body: Person): Promise<Person>{
    const url = environment.apiBaseUrl + "/person/update";
    return fetchAndParse(url,{method: 'PUT', headers: headers, body: JSON.stringify(body)});
}

export async function deletePerson(body: number): Promise<Person>{
    const url = environment.apiBaseUrl + `/person/delete/${body}`; //body equals id
    return fetchAndParse(url,{method: 'DELETE', headers: headers, body: JSON.stringify(body)});
}