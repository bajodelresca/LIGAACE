import { Team } from "./Team";

export interface Player{
    id:number,
    email:string,
    password:string,
    assists?:number,
    games?:number,
    goals?:number,
    image?:string,
    mvp?:number,
    name?:string,
    redcards?:number,
    yellowcards?:number;
    team?:Team
}