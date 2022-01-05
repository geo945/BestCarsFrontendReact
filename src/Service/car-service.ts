import {CarInfo} from "../Model/Car-payload";
import {environment, headers} from "../config/config";
import { fetchAndParse } from "../utils/utilFunctions";
import { Car } from "../Model/Car";

export async function addCarOffer(body: CarInfo): Promise<Car>{
    const url = environment.apiBaseUrl + "/car/add";
    return fetchAndParse(url,{method: 'POST', headers: headers, body: JSON.stringify(body)});
}

export async function getAllOffers(): Promise<Car[]>{
    const url = environment.apiBaseUrl + "/car/all";
    return fetchAndParse(url,{method: 'GET', headers: headers});
}

export async function deleteCarOffer(id: number): Promise<Car>{
    const url = environment.apiBaseUrl + `/car/deleteAd/${id}`;
    return fetchAndParse(url, {method: 'DELETE', headers: headers});
}

export async function approveCarOffer(body: Car): Promise<Car>{
    const url = environment.apiBaseUrl + "/car/approveAd";
    return fetchAndParse(url,{method: 'PUT', headers: headers, body: JSON.stringify(body)});
}