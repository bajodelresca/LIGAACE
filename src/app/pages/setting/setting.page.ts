import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { Player } from 'src/app/model/Player';
import { AuthService } from 'src/app/services/auth.service';
import { LanguageService } from 'src/app/services/language.service';
import { PlayerfService } from 'src/app/services/playerf.service';
import { ThemesService } from 'src/app/services/themes.service';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
  themeMode = -1;
  lang: any;
  themes: any;
  lng = '';


  constructor(private playerf: PlayerfService,
    private ui: UtilitiesService,
    private auth: AuthService,
    private router: Router,
    private language: LanguageService,
    private alertController: AlertController,
    private theme: ThemesService) { this }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.initTheme();
  }

  //______________________________________________________________________FUNCION PARA CAMBIAR LENGUAJE
  lnga = this.language.selected;
  switchLanguage($event) {
    this.language.setLanguage($event.target.value);
    console.log($event.target.value);
  }
  //______________________________________________________________________FUNCION PARA DESLOGEAR
  public async logout() {
    await this.auth.logout();
    if (!this.auth.isLogged()) {
      this.router.navigate(['/login'])
    }
  }
  //______________________________________________________________________FUNCION BORRAR CUENTA
  public async removePlayer(player: Player) {
    await this.ui.showLoading();
    player = this.auth.Player
    this.playerf
      .removePlayer(player)
      .then(async d => await this.logout())
      .catch(async err => await this.ui.showToast(err.error, "danger"))
      .finally(async () => {
        await this.ui.hideLoading();
      });
  }
  //______________________________________________________________________FUNCION PARA ABRIR ALERT
  async presentAlert(player: Player) {
    player=this.auth.Player
    console.log(player)
    const alert = await this.alertController.create({
      inputs: [
        {
          name: 'name1',
          type: 'text'
        },],

      header: '¿Estás seguro de borrar tu cuenta?, introduce tu nombre',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: () => {
          // Ha respondido que no así que no hacemos nada
        }
      },
      {
        text: 'Si',
        handler: (alertData) => {
          console.log(alertData.name1)
          // AquÍ borramos el sitio en la base de datos
          if(alertData.name1==player.name){
             this.removePlayer(player);
          }else{
            this.ui.showToast("El nombre no coincide", "danger");
          }
         
        }
      }]
    });

    await alert.present();
  }
  //______________________________________________________________________FUNCION PARA CAMBIAR TEMA
  changeTheme($event, mode) {
    console.log($event);
    this.themeMode = mode;
    if ($event.detail.checked) {
      switch (mode) {
        case 0:
          document.body.classList.toggle('dark-theme');
          break;

      }
    } else {
      this.themeMode = -1;
      document.body.classList.remove('dark-theme');
    }

  }


  //______________________________________________________________________FUNCION PARA CAMBIAR TEMA
  switchtheme($event) {
    this.theme.changeTheme($event);
    console.log($event.target.value);
  }
  lngag = this.theme.selected;
  switchthemes($event) {
    this.theme.setThemes($event.target.value);
    console.log($event.target.value);
  }

  //______________________________________________________________________FUNCION PARA TEMA INICIAL
  initTheme() {
    if (this.theme.selected == "dark-theme") {
      this.lng = "Activado"
    } else {
      this.lng = "Desactivado"
    }
  }

}
