import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
const TH_KEY = 'SELECTED_THEME';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {
  themeMode = -1;
  selected = "";

  constructor(private storage: NativeStorage) { }

  //______________________________________________________________________FUNCION PARA TEMA INICIAL
  public setInitialAppTheme() {
    this.storage.getItem(TH_KEY).then(val => {
      if (val) {
        this.setThemes(val);
        this.selected = val;
      }
    });


  }

  //______________________________________________________________________FUNCION PARA CAMBIAR TEMA
  public setThemes(th) {
    console.log(th)
    if (th == 'dark-theme') {
      document.body.classList.remove('ligththeme');
      document.body.classList.toggle('dark-theme');
      console.log(th)
      this.storage.setItem(TH_KEY, th);
    } else if (th == 'ligththeme') {
      document.body.classList.remove('dark-theme');
      document.body.classList.toggle('ligththeme');
      this.storage.setItem(TH_KEY, th);
      console.log(th)
    }

  }

  //______________________________________________________________________FUNCION PARA CAMBIAR TEMA

  changeTheme($event) {
    console.log($event);
    if ($event.detail.checked) {
      document.body.classList.toggle('dark-theme');
      this.setThemes('dark-theme')

    } else {
      this.themeMode = -1;
      document.body.classList.remove('dark-theme');
      this.setThemes('');
    }

  }
}
