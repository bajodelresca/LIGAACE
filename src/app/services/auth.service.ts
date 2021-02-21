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
    goals: 0,
    mvp: 0,
    redcards: 0,
    yellowcards: 0,
    idequipo: 0
  }

  constructor(private storage: NativeStorage,
    private router: Router) {
  }

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
  public async logout() {
    this.Player = {
      id: -1,
      name: '',
      image: '',
      email: '',
      password: '',
      assists: 0,
      games: 0,
      goals: 0,
      mvp: 0,
      redcards: 0,
      yellowcards: 0,
      idequipo: 0
    }
    await this.storage.setItem("user", this.Player);
  }
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
          mvp: u['mvp'],
          redcards: u['redcards'],
          yellowcards: u['yellowcards'],
          idequipo: u['idequipo']

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
      goals: 0,
      mvp: 0,
      redcards: 0,
      yellowcards: 0,
      idequipo: 0
      }
    }
    await this.storage.setItem("user", this.Player);
    return this.Player;
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    console.log("ESTOY EN CANACTIVATE Y EL RESULT ES " + this.isLogged())
    if (!this.isLogged()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }

  getUser() {
    return this.Player;
  }

  setUser(p: Player){
    this.storage.setItem("user", p);
  }
}
