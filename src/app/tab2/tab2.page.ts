import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AlertController, NavController } from '@ionic/angular';
import { Game } from '../model/Game';
import { AuthService } from '../services/auth.service';
import { GamefService } from '../services/gamef.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  admin: any;
  public listado2: Array<Game>;

  constructor(private ui: UtilitiesService,
    private gamef: GamefService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private alertController: AlertController,
    private navigate:NavController ) { }
  async ionViewDidEnter() {
    await this.loadGames();
    console.log(this.listado2)
    this.admin = this.auth.getUser().admin
    console.log(this.admin)
  }


  //______________________________________________________________________FUNCION PARA CARGAR PARTIDOS

  public async loadGames() {
    await this.ui.showLoading();
    try {
      this.listado2 = await this.gamef.getGame();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado2 = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }
  //______________________________________________________________________FUNCION PARA ABRIR PARTIDOS
  public async openGame(game: Game) {
    await this.gamef.openGame(game);
    await this.loadGames();
  }
  //______________________________________________________________________FUNCION PARA BORRAR PARTIDOS
  public async removeGame(game: Game) {
    await this.ui.showLoading();
    this.gamef
      .removeGame(game)
      .then(async d => await this.loadGames())
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
        await this.ui.hideLoading();
      });
  }
  //______________________________________________________________________FUNCION PARA ABRIR MODAL
  async presentAlert(game: Game) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de borrar el partido?',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Si',
        handler: () => {
          // AquÍ borramos el sitio en la base de datos
          this.removeGame(game);
        }
      }]
    });

    await alert.present();
  }

}
