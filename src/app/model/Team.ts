import { Player } from "./Player";
import { Game } from "./Game";

export interface Team{
    id?:number,
    name:string,
    image:string,
    games:number,
    matcheswon:number,
    lostmatches:number,
    tiedmatches:number,
    goals:number,
    goalsc:number,
    createdate:number;
    points:number
    repertorio?:Player[];
    matches?:Game[];
}