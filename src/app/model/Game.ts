import { Team } from "./Team";
export interface Game{
    id:number,
    jornada:number,
    resultado?:string,   
    t?:Team[];
}