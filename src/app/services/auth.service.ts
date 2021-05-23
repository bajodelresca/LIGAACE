import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Player } from '../model/Player';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  public Player = {
    id: -1,
    name: '',
    image: '',
    email: '',
    password: '',
    assists: 0,
    games: 0,
    admin: '',
    goals: 0,
    mvp: 0,
    redcards: 0,
    yellowcards: 0,
    team: null
  }

  constructor(private storage: NativeStorage,
    private router: Router) {
  }
  //______________________________________________________________________FUNCION PARA CARGAR USUARIO LOGEADO
  async init() {
    console.log("AL INICIO DE LOS TIEMPOS")
    let u = null;
    try {
      u = await this.storage.getItem("user");
    } catch (err) {
      u = null;
    }
    if (u != null) {
      this.Player = u;
    }
  }

  public isLogged(): boolean {
    if (this.Player.id == -1) {
      return false;
    } else {
      return true;
    }
  }

  //______________________________________________________________________FUNCION PARA DESLOGEAR
  public async logout() {
    this.Player = {
      id: -1,
      name: '',
      image: '',
      email: '',
      password: '',
      assists: 0,
      admin: '',
      games: 0,
      goals: 0,
      mvp: 0,
      redcards: 0,
      yellowcards: 0,
      team: null
    }
    await this.storage.setItem("user", this.Player);
  }

  //______________________________________________________________________FUNCION PARA LOGEARSE
  public async login(u: Player) {
    try {
      if (u) {
        console.log("OK")
        this.Player = {
          id: u['id'],
          name: u['name'],
          image: u['image'],
          email: u['email'],
          password: u['password'],
          assists: u['assists'],
          games: u['games'],
          goals: u['goals'],
          admin: u['admin'],
          mvp: u['mvp'],
          redcards: u['redcards'],
          yellowcards: u['yellowcards'],
          team: u['team']

        }

      }
    } catch (err) {
      this.Player = {
        id: -1,
        name: '',
        image: '',
        email: '',
        password: '',
        assists: 0,
        games: 0,
        admin: '',
        goals: 0,
        mvp: 0,
        redcards: 0,
        yellowcards: 0,
        team: null
      }
    }
    await this.storage.setItem("user", this.Player);
    return this.Player;
  }
  //______________________________________________________________________FUNCION PARA NO PODER ACCEDER SIN ESTAR LOGEADO
  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log("ESTOY EN CANACTIVATE Y EL RESULT ES " + this.isLogged())
    if (!this.isLogged()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
  //______________________________________________________________________FUNCION PARA CARGAR USUARIO DE MEMORIA
  getUser() {
    return this.Player;
  }
  //______________________________________________________________________FUNCION PARA GUARDAR USUARIO EN MEMORIA
  setUser(p: Player) {
    this.storage.setItem("user", p);
  }
}
