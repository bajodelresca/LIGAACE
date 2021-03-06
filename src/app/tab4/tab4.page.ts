import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar, ModalController, NavController } from '@ionic/angular';
import { Player } from '../model/Player';
import { FormpPage } from '../pages/formp/formp.page';
import { AuthService } from '../services/auth.service';
import { PlayerfService } from '../services/playerf.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page implements OnInit {
  admin: any;
  public listado: Array<Player>;
  @ViewChild('input', { static: false }) myInput: IonSearchbar;

  constructor(private nadCtrl: NavController,
    private playerf: PlayerfService,
    private ui: UtilitiesService,
    private alertController: AlertController,
    private auth: AuthService,
    private modalcontroller:ModalController) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.admin = this.auth.getUser().admin
    console.log(this.admin)
  }

  onClick() {
    this.nadCtrl.navigateBack('player');

  }
  public items: any;

  async ionViewDidEnter() {
    await this.loadPlayers();
  }


  getItems(ev: any) {
    const val = ev.target.value;
    this.items = this.listado;
    if (val && val.trim() != '') {
      this.items = this.items.filter((data) => {
        return (data.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  //______________________________________________________________________FUNCION PARA CARGAR JUGADORES

  public async loadPlayers() {
    await this.ui.showLoading();
    try {
      this.listado = await this.playerf.getPlayer();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }


  //______________________________________________________________________FUNCION PARA BORRAR JUGADORES

  public async removePlayer(player: Player) {
    await this.ui.showLoading();
    this.playerf
      .removePlayer(player)
      .then(async d => await this.loadPlayers())
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
        await this.ui.hideLoading();
      });
  }


  //______________________________________________________________________FUNCION PARA BUSCAR JUGADORES

  public async searchPlayer($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.playerf.searchByName(value)
        .then(d => {
          this.listado = d;
        })
        .catch(async err => await this.ui.showToast(err.error, "danger"))
        .finally(async () => {
          // await this.ui.hideLoading();
          // this.myInput.setFocus();
        });
    } else {
      await this.loadPlayers();
    }
  }
  //______________________________________________________________________FUNCION PARA AÑADIR JUGADORES

  public async addPlayer() {
    const PlayerToBeUpdated = await this.ui.showModal(FormpPage, { Player: {} });
    console.log(PlayerToBeUpdated);
    try {
      if (PlayerToBeUpdated.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.playerf.updatePlayer(PlayerToBeUpdated.data);
        await this.loadPlayers();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }

  //______________________________________________________________________FUNCION PARA EDITAR JUGADORES


  public async editPlayer(player: Player) {
    const modal = await this.modalcontroller.create({
      component: FormpPage,
      cssClass: 'my-custom-player',
      componentProps: {
        player: player
      }
    });
    return await modal.present();
  }

  public openPlayer(player: Player) {
    this.playerf.openPlayer(player);
    console.log(player)
  }

  async presentAlert(player: Player) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de borrar a ' + player.name + '?',
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
          this.removePlayer(player);
        }
      }]
    });

    await alert.present();
  }
}
