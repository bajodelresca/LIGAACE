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

  constructor(private storage: NativeStorage,
    private route:Router) { }

  public setInitialAppSlide() {
    this.storage.getItem(SLIDE).then(val => {
      if (val) {
        console.log(val)
        this.setThemes(val)
      }
    });


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
