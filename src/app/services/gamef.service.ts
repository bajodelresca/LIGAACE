import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Game } from '../model/Game';
import { MatchPage } from '../pages/match/match.page';
@Injectable({
  providedIn: 'root'
})
export class GamefService {

  constructor(private http: HTTP,
    private modalController: ModalController) { }

    public getGame(id?:number | string): Promise<Game[] | null> {
      return new Promise((resolve, reject) => {
        let endpoint = environment.endpoint + environment.apiGame;
        if(id){
          endpoint+=id;
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
    public searchByName(value:string): Promise<Game[] | null> {
      return this.getGame('search/' +value);
    }
  
      public removeGame(game: any): Promise<void> {
      const id: any = game.id ? game.id : game;
      const endpoint = environment.endpoint + environment.apiGame + id;
      return new Promise((resolve, reject) => {
        this.http
          .delete(endpoint, {}, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      });
    }
  
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
}