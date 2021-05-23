import { Component, ViewChild } from '@angular/core';
import { AlertController, IonSearchbar } from '@ionic/angular';
import { Team } from '../model/Team';
import { FormpPage } from '../pages/formp/formp.page';
import { AuthService } from '../services/auth.service';
import { TeamfService } from '../services/teamf.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  admin: any;
  public listado: Array<Team>;
  @ViewChild('input', { static: false }) myInput: IonSearchbar;

  constructor(private teamf: TeamfService,
    private ui: UtilitiesService,
    private alertController: AlertController,
    private auth: AuthService) { }


  public items: any;

  async ionViewDidEnter() {
    await this.loadTeams();
  }

  ionViewWillEnter() {
    this.admin = this.auth.getUser().admin
    console.log(this.admin)
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
  //______________________________________________________________________FUNCION PARA CARGAR EQUIPOS
  public async loadTeams() {
    await this.ui.showLoading();
    try {
      this.listado = await this.teamf.getTeam();
      await this.ui.hideLoading();
    } catch (err) {
      this.listado = null; //vista
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }
  //______________________________________________________________________FUNCION PARA BORRAR EQUIPOS
  public async removeTeam(team: Team) {
    await this.ui.showLoading();
    this.teamf
      .removeTeam(team)
      .then(async d => await this.loadTeams())
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
        await this.ui.hideLoading();
      });
  }
  //______________________________________________________________________FUNCION PARA BUSCAR EQUIPOS
  public async searchTeam($event) {
    let value = $event.detail.value;
    value = value.trim();
    if (value !== '') {
      //await this.ui.showLoading();
      this.teamf.searchByName(value)
        .then(d => {
          this.listado = d;
        })
        .catch(async err => await this.ui.showToast(err.error, "danger"))
        .finally(async () => {
          // await this.ui.hideLoading();
          // this.myInput.setFocus();
        });
    } else {
      await this.loadTeams();
    }
  }


  //______________________________________________________________________FUNCION PARA AÑADIR EQUIPOS

  public async addTeam() {
    if (this.listado.length < 22) {
      const TeamToBeUpdated = await this.ui.showModal(FormpPage, { Team: {} });
      console.log(TeamToBeUpdated);
      try {
        if (TeamToBeUpdated.data) {
          // si no cierra
          await this.ui.showLoading();
          await this.teamf.updateTeam(TeamToBeUpdated.data);
          await this.loadTeams();
        }
      } catch (err) {
        await this.ui.hideLoading();
        await this.ui.showToast(err.error, "danger");
      }
    } else {
      this.ui.showToast("limite alcanzado", "danger");
    }

  }
  //______________________________________________________________________FUNCION PARA EDITAR EQUIPOS

  public async editTeam(_team: Team) {
    const TeamToBeUpdated = await this.ui.showModal(FormpPage, { Team: _team });
    try {
      if (TeamToBeUpdated.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.teamf.updateTeam(TeamToBeUpdated.data);
        await this.loadTeams();
      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }

  }

  //______________________________________________________________________FUNCION PARA ABRIR EQUIPOS

  public async openTeam(team: Team) {
    await this.teamf.openTeam(team);
    //await this.loadTeams();
  }


  //______________________________________________________________________FUNCION PARA ABRIR ALERT
  async presentAlert(team: Team) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de borrar a ' + team.name + '?',
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
          this.removeTeam(team);
        }
      }]
    });

    await alert.present();
  }
}

