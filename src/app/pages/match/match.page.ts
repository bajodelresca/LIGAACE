import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/model/Game';
import { AuthService } from 'src/app/services/auth.service';
import { GamefService } from 'src/app/services/gamef.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.page.html',
  styleUrls: ['./match.page.scss'],
})
export class MatchPage implements OnInit {
  @Input("nota") game: Game;
  slide1=false;
  admin:any

  constructor(private modalController: ModalController,
    private gamef: GamefService,
    private auth:AuthService,
    private ui:UtilitiesService) { }

  ngOnInit() {
    this.loading()
    console.log(this.game)
    if(this.game){
      this.slide1=true
    }
  }
  async loading() {
    await this.ui.showLoading()
    setTimeout(() => {
      this.slide1 = true
    }, 2000);

    console.log(this.slide1)
    this.ui.hideLoading()

  }
  ionViewWillEnter() {
    this.admin = this.auth.getUser().admin
    console.log(this.admin)
  }
  //______________________________________________________________________FUNCION PARA CERRAR MODAL

  public exit() {
    this.modalController.dismiss();
  }
  //______________________________________________________________________FUNCION PARA ABRIR PANTALLA DE JUGAR PARTIDO

  public async openGame() {
    await this.gamef.openGame2(this.game);
  }

}