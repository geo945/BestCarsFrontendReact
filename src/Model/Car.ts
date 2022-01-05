import {Person} from "./Person";

export interface Car{
    id: number;
    title: string;
    fabricationYear: number;
    mileage: number;
    fuelType: string;
    city: string;
    price: number;
    image: string;
    person: Person;
    approved: boolean;
}