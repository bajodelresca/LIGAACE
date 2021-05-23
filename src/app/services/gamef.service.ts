import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Game } from '../model/Game';
import { GamestatsPage } from '../pages/gamestats/gamestats.page';
import { MatchPage } from '../pages/match/match.page';
@Injectable({
  providedIn: 'root'
})
export class GamefService {

  constructor(private http: HTTP,
    private modalController: ModalController) { }
  //______________________________________________________________________FUNCION PARA CARGAR PARTIDOS
  public getGame(id?: number | string): Promise<Game[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiGame;
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
  private get header(): any {
    return {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'

    }
  }
  //______________________________________________________________________FUNCION PARA BORRAR PARTIDO

  public removeGame(game: any): Promise<void> {
    const id: any = game.id ? game.id : game;
    const endpoint = environment.endpoint + environment.apiGame + id;
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve(JSON.parse(d.data));
        })
        .catch(err => reject(err));
    });
  }

  //______________________________________________________________________FUNCION PARA CREAR PARTIDO


  public createGame(game: Game): Promise<void> {
    const endpoint = environment.endpoint + environment.apiGame;
    return new Promise((resolve, reject) => {
      if (game) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, game, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe partido');
      }
    });
  }
  //______________________________________________________________________FUNCION PARA ACTUALIZAR EQUIPO

  public updateGame(game: Game): Promise<void> {
    const endpoint = environment.endpoint + environment.apiGame;
    return new Promise((resolve, reject) => {
      if (game) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, game, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe partido');
      }
    });
  }
  //______________________________________________________________________FUNCION PARA ABRIR PARTIDO

  public async openGame(game: Game) {
    const modal = await this.modalController.create({
      component: MatchPage,
      cssClass: 'my-custom-note',
      componentProps: {
        game: game
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }
  //______________________________________________________________________FUNCION PARA ABRIR PARTIDO (op2)

  public async openGame2(game: Game) {
    const modal = await this.modalController.create({
      component: GamestatsPage,
      cssClass: 'my-custom-note',
      componentProps: {
        game: game
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }


  //______________________________________________________________________FUNCION PARA CARGAR PARTIDOS POR ID

  public getGameid(id?: number | string): Promise<Game[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiGame + "ids";
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
}
