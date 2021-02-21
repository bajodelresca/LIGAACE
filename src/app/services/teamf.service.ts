import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Team } from '../model/Team';
import { TeamPage } from '../pages/team/team.page';

@Injectable({
  providedIn: 'root'
})
export class TeamfService {

  constructor(private http:HTTP,
    private modalController: ModalController) { }

  public getTeam(id?:number | string): Promise<Team[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTeam;
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
  public searchByName(value:string): Promise<Team[] | null> {
    return this.getTeam('search/' +value);
  }

    public removeTeam(team: any): Promise<void> {
    const id: any = team.id ? team.id : team;
    const endpoint = environment.endpoint + environment.apiTeam + id;
    return new Promise((resolve, reject) => {
      this.http
        .delete(endpoint, {}, this.header)
        .then(d => {
          resolve();
        })
        .catch(err => reject(err));
    });
  }

  public createTeam(team: Team): Promise<void> {
    const endpoint = environment.endpoint + environment.apiTeam;
    return new Promise((resolve, reject) => {
      if (team) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .post(endpoint, team, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe equipo');
      }
    });
  }

  public updateTeam(team: Team): Promise<void> {
    const endpoint = environment.endpoint + environment.apiTeam;
    return new Promise((resolve, reject) => {
      if (team) {
        this.http.setDataSerializer('json'); //send body as json, needed
        this.http
          .put(endpoint, team, this.header)
          .then(d => {
            resolve();
          })
          .catch(err => reject(err));
      } else {
        reject('No existe equipo');
      }
    });
  }

  public async openTeam(team: Team) {
    const modal = await this.modalController.create({
      component: TeamPage,
      cssClass: 'my-custom-note',
      componentProps: {
        team: team
      }
    });
    await modal.present();
    return await modal.onWillDismiss();
  }

  public getTeamclasification(id?:number | string): Promise<Team[] | null> {
    return new Promise((resolve, reject) => {
      let endpoint = environment.endpoint + environment.apiTeam+"clasification/";
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
}
