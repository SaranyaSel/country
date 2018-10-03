import { Currencies } from "./currencies";

export class Country{
    name: string;
    alpha3Code:string;
    area:number;
    flag:string;
    currencies:Currencies[];
    latlng: number[];
}