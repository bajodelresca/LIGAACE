import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ModalController } from '@ionic/angular';
import { id } from '@swimlane/ngx-datatable';
import { environment } from 'src/environments/environment';
import { Player } from '../model/Player';
import { PlayerPage } from '../pages/player/player.page';

@Injectable({
  providedIn: 'root'
})
export class PlayerfService {

  constructor(private http: HTTP,
    private modalController: ModalController) { }
  //______________________________________________________________________FUNCION PARA CARGAR JUGADORES

  public getPlayer(id?: number | string): Promise<Player[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiPlayer;
      if (id) {
        endpoint += id;
      }
      this.http.get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            resolve(JSON.parse(d.data));

          } else {
            resolve(null);
          }


        })
        .catch(err => reject(err));
    });

  }
  //______________________________________________________________________FUNCION PARA CARGAR JUGADORES DE UN EQUIPO

  public getPlayerTeam(id: number): Promise<Player[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiPlayer + "team/" + id;
      this.http.get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            resolve(JSON.parse(d.data));

          } else {
            resolve(null);
          }


        })
        .catch(err => reject(err));
    });

  }
  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'

    }
  }
  //______________________________________________________________________FUNCION PARA BUSCAR JUGADORES POR NOMBRE

  public searchByName(value: string): Promise<Player[] | null> {
    return this.getPlayer('search/' + value);
  }
  //______________________________________________________________________FUNCION PARA COMPROBAR SI LA CUENTA EXISTE


  public searchByCount(email: String, password: string): Promise<Player | null> {
    return new Promise((resolve, reject) => {
      const endpoint = environment.endpoint + environment.apiPlayer + "search/" + email + "/" + password;
      this.http.get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            //console.log(d.data)
            resolve(JSON.parse(d.data));
          } else {
            resolve(null);
          }
        }).catch(err => reject(err));
    });
  }
  //______________________________________________________________________FUNCION PARA BUSCAR EMAIL

  public searchByEmail(email: String): Promise<Player | null> {
    return new Promise((resolve, reject) => {
      const endpoint = environment.endpoint + environment.apiPlayer + "searching/" + email;
      this.http.get(endpoint, {}, this.header)
        .then(d => {
          if (d) {
            console.log(d.data)
            resolve(JSON.parse(d.data));
          } else {
            resolve(null);
          }
        }).catch(err => reject(err));
    });
  }
  //______________________________________________________________________FUNCION PARA BORRAR JUGADORES

  public removePlayer(player: any): Promise<void> {
    const id: any = player.id ? player.id : player;
    const endpoint = environment.endpoint + environment.apiPlayer + id;
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }
  //______________________________________________________________________FUNCION PARA CREAR JUGADORES

  public createPlayer(player: Player): Promise<void> {
    const endpoint = environment.endpoint + environment.apiPlayer;
    return new Promise((resolve, reject) => {
      if (player) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, player, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe jugador');
      }
    });
  }
  //______________________________________________________________________FUNCION PARA ACTUALIZAR JUGADORES

  public updatePlayer(player: Player): Promise<void> {
    const endpoint = environment.endpoint + environment.apiPlayer;
    return new Promise((resolve, reject) => {
      if (player) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, player, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe jugador');
      }
    });
  }


  //______________________________________________________________________FUNCION PARA ABRIR JUGADOR


  public async openPlayer(player: Player) {
    const modal = await this.modalController.create({
      component: PlayerPage,
      cssClass: 'my-custom-player',
      componentProps: {
        player: player
      }
    });
    return await modal.present();
  }
}
