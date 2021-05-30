import { Component, Input, OnInit } from '@angular/core';
import { Team } from 'src/app/model/Team';
import { Game } from 'src/app/model/Game';
import { GamefService } from 'src/app/services/gamef.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-teamcalendar',
  templateUrl: './teamcalendar.page.html',
  styleUrls: ['./teamcalendar.page.scss'],
})
export class TeamcalendarPage implements OnInit {
  @Input("nota") team: Team;
  listado2: any;
  data: any

  constructor(private gamef: GamefService,
    private ui: UtilitiesService,
    private modalController:ModalController) { }

  ngOnInit() {
    this.loadGames();
    console.log(this.listado2)
  }
  //______________________________________________________________________FUNCION PARA CARGAR PARTIDOS DEL EQUIPO
  async loadGames() {
    await this.ui.showLoading();
    this.listado2 = []
    this.team.matches.forEach(async game => {
      this.data = await this.gamef.getGame(game.id)
      console.log(this.data)
      await this.listado2.push(this.data)
      console.log(this.listado2)
      this.ui.hideLoading()

    })

  }
  public exit() {
    this.modalController.dismiss();
  }

}
