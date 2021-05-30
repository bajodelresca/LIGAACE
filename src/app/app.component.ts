import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './services/language.service';
import { AuthService } from './services/auth.service';
import { ThemesService } from './services/themes.service';
import { SlideService } from './services/slide.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private languageService:LanguageService,
    private auth:AuthService,
    private theme:ThemesService,
    private slide:SlideService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString("#C70039");
      this.splashScreen.hide();
      this.auth.init();
      this.theme.setInitialAppTheme();      
      this.slide.isFirstTimeLoad()
      this.languageService.setInitialAppLanguage();
      
    });
  }
}
