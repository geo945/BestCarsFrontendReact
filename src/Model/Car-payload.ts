import {Person} from "./Person";

export interface CarInfo{
    title: string;
    fabricationYear: number;
    mileage: number;
    fuelType: string;
    city: string;
    price: number;
    person: Person;
}