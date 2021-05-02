import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Game } from '../model/Game';
import { GamefService } from '../services/gamef.service';
import { UtilitiesService } from '../services/utilities.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public listado2: Array<Game>;

  constructor(private ui: UtilitiesService,
    private gamef: GamefService,
    private formBuilder: FormBuilder) { }
  async ionViewDidEnter() {
    await this.loadGames();
    console.log(this.listado2)
  }

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

  public async openGame(game: Game){
    await this.gamef.openGame(game);
    await this.loadGames();
  }

}
