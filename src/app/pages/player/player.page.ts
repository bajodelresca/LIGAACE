import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Player } from 'src/app/model/Player';

@Component({
  selector: 'app-player',
  templateUrl: './player.page.html',
  styleUrls: ['./player.page.scss'],
})
export class PlayerPage implements OnInit {
  @Input("player") player: Player;
  teamname:string

  constructor(private modalController: ModalController) { }

  ngOnInit() {
    console.log(this.player);
    this.teamName();
  }

  public exit() {
    this.modalController.dismiss();
  }

  public teamName(){
    if(this.player.team==undefined){
      this.teamname="Agente libre"

    }else{
      this.teamname=this.player.team.name
    }

  }

}
