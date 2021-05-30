import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
const SLIDE = 'SLIDE_STATE';

@Injectable({
  providedIn: 'root'
})
export class SlideService {

  themeMode = -1;
  selected = "";
  firstTime: boolean;

  constructor(private storage: NativeStorage,
    private route: Router) { }

    saveFirstTimeLoad(): void {
      this.storage.setItem('firstTime', true);
    }
  
    isFirstTimeLoad(): void {
      this.storage.getItem("firstTime").then((result) => {
        if (result != undefined) {
          this.firstTime = false;
          console.log("false")
        }
        else {
          this.firstTime = true;
          console.log("true")
        }
      })
    }


  


  public setThemes(th) {
    console.log(th)
    if (th != 'visto') {
      this.route.navigate(['/slides'])
      console.log(th)
      this.storage.setItem(SLIDE, th);
    } else {

    }

  }



}
