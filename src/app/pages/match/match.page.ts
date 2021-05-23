import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Game } from 'src/app/model/Game';
import { AuthService } from 'src/app/services/auth.service';
import { GamefService } from 'src/app/services/gamef.service';

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
    private auth:AuthService) { }

  ngOnInit() {
    console.log(this.game)
    if(this.game){
      this.slide1=true
    }
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