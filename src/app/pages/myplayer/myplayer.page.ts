import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerfService } from 'src/app/services/playerf.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { FormpPage } from '../formp/formp.page';

@Component({
  selector: 'app-myplayer',
  templateUrl: './myplayer.page.html',
  styleUrls: ['./myplayer.page.scss'],
})
export class MyplayerPage implements OnInit {
  teamname: string

  player: Player = {
    id: -1,
    name: '',
    image: '',
    email: '',
    password: '',
    admin: '',
    assists: 0,
    games: 0,
    goals: 0,
    mvp: 0,
    redcards: 0,
    yellowcards: 0,

  }

  constructor(private auth: AuthService,
    private playerf: PlayerfService,
    private ui: UtilitiesService,
    private modalController: ModalController) { }

  ionViewDidEnter(): void {
    this.loadPlayer();
    console.log(this.player);
  }

  ngOnInit() {
    this.loadPlayer();
    console.log(this.player);
  }
  //______________________________________________________________________FUNCION CARGAR DATOS DE USUARIO LOGEADO
  loadPlayer() {
    this.player = {
      id: this.auth.getUser().id,
      name: this.auth.getUser().name,
      image: this.auth.getUser().image,
      email: this.auth.getUser().email,
      password: this.auth.getUser().password,
      assists: this.auth.getUser().assists,
      games: this.auth.getUser().games,
      goals: this.auth.getUser().goals,
      mvp: this.auth.getUser().mvp,
      admin: this.auth.getUser().admin,
      redcards: this.auth.getUser().redcards,
      yellowcards: this.auth.getUser().yellowcards,

    }

    console.log(this.player)
  }



  //______________________________________________________________________FUNCION PARA CERRAR MODAL
  public exit() {
    this.modalController.dismiss();
  }
  //______________________________________________________________________FUNCION PARA NOMBRE DEL EQUIPO
  public teamName() {
    if (this.player.team == undefined) {
      this.teamname = "Agente libre"

    } else {
      this.teamname = this.player.team.name
    }

  }

  //______________________________________________________________________FUNCION ABRIR PANTALLA DE EDICIÓN DE JUGADOR
  public async editPlayer(_player: Player) {
    const PlayerToBeUpdated = await this.ui.showModal(FormpPage, { Player: _player });
    try {
      if (PlayerToBeUpdated.data) {
        // si no cierra
        await this.ui.showLoading();
        await this.playerf.updatePlayer(PlayerToBeUpdated.data);

      }
    } catch (err) {
      await this.ui.hideLoading();
      await this.ui.showToast(err.error, "danger");
    }
  }
}
