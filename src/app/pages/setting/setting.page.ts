import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { PlayerfService } from 'src/app/services/playerf.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  lang: any;

  constructor(private playerf:PlayerfService,
    private ui:UtilitiesService,
    private auth: AuthService,
    private router: Router,
    private language: LanguageService,
    private alertController: AlertController) { }

  ngOnInit() {
  }
    lnga = this.language.selected;
  switchLanguage($event) {
    this.language.setLanguage($event.target.value);
    console.log($event.target.value);
  }

  public async logout() {
    await this.auth.logout();
    if (!this.auth.isLogged()) {
      this.router.navigate(['/login'])
    }
  }

  public async removePlayer(player: Player) {
    await this.ui.showLoading();
    player=this.auth.Player
    this.playerf
      .removePlayer(player)
      .then(async d => await this.logout())
      .catch(async err => await this.ui.showToast(err.error,"danger"))
      .finally(async () => {
        await this.ui.hideLoading();
      });
  }

  async presentAlert(player: Player) {
    const alert = await this.alertController.create({
      header: '¿Estás seguro de borrar tu cuenta?, esta cuenta no podrá ser recuperada',
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
