import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { PlayerfService } from 'src/app/services/playerf.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {
  @Input("player") player: Player;
  teamname: string
  admin: any;
  idloged:any;

  constructor(private modalController: ModalController,
    private playerf: PlayerfService,
    private auth: AuthService,
    private alertcontroller: AlertController) { }

  ngOnInit() {
    console.log(this.player);
    this.teamName();
    this.admin = this.auth.getUser().admin;
    this.idloged = this.auth.getUser().id;
    console.log(this.idloged)
    console.log(this.admin)
    console.log(this.player.team)
  }
  //______________________________________________________________________FUNCION PARA CERRAR MODAL
  public exit() {
    this.modalController.dismiss();
  }
  //______________________________________________________________________FUNCION PARA NOMBRE EQUIPO
  public teamName() {
    if (this.player.team == undefined) {
      this.teamname = "Agente libre"

    } else {
      this.teamname = this.player.team.name
    }

  }
  //______________________________________________________________________FUNCION DAR PODER DE ADMIN
  public async setAdmin() {
    if (this.player.team != null) {
      this.player = {
        id: this.player.id,
        name: this.player.name,
        image: this.player.image,
        email: this.player.email,
        password: this.player.password,
        assists: this.player.assists,
        admin: "yes",
        games: this.player.games,
        goals: this.player.goals,
        mvp: this.player.mvp,
        redcards: this.player.redcards,
        yellowcards: this.player.yellowcards,
        team: this.player.team



      }
    } else {
      this.player = {
        id: this.player.id,
        name: this.player.name,
        image: this.player.image,
        email: this.player.email,
        password: this.player.password,
        assists: this.player.assists,
        admin: "yes",
        games: this.player.games,
        goals: this.player.goals,
        mvp: this.player.mvp,
        redcards: this.player.redcards,
        yellowcards: this.player.yellowcards,



      }
    }

    console.log(this.player)
    this.playerf.updatePlayer(this.player).then((respuesta) => {
    }).catch((err) => {
      console.log(err);
    });


  }
  //______________________________________________________________________FUNCION PARA ABRIR ALERT
  async presentAlert() {
    const alert = await this.alertcontroller.create({
      header: '¿Estás seguro de dar privilegios de administrador a ' + this.player.name + '?',
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
          this.setAdmin();

        }
      }]
    });

    await alert.present();
  }

  //______________________________________________________________________FUNCION PARA DAR PODER ADMIN SUPERIOR
  public async setAdmin2() {
    if (this.player.team != null) {
      this.player = {
        id: this.player.id,
        name: this.player.name,
        image: this.player.image,
        email: this.player.email,
        password: this.player.password,
        assists: this.player.assists,
        admin: "",
        games: this.player.games,
        goals: this.player.goals,
        mvp: this.player.mvp,
        redcards: this.player.redcards,
        yellowcards: this.player.yellowcards,
        team: this.player.team



      }
    } else {
      this.player = {
        id: this.player.id,
        name: this.player.name,
        image: this.player.image,
        email: this.player.email,
        password: this.player.password,
        assists: this.player.assists,
        admin: "",
        games: this.player.games,
        goals: this.player.goals,
        mvp: this.player.mvp,
        redcards: this.player.redcards,
        yellowcards: this.player.yellowcards,



      }
    }

    console.log(this.player)
    this.playerf.updatePlayer(this.player).then((respuesta) => {
    }).catch((err) => {
      console.log(err);
    });


  }
  //______________________________________________________________________FUNCION PARA ABRIR ALERT
  async presentAlert2() {
    const alert = await this.alertcontroller.create({
      header: '¿Estás seguro de quitar privilegios de administrador a ' + this.player.name + '?',
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
          this.setAdmin2();

        }
      }]
    });

    await alert.present();
  }


}

