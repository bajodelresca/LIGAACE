import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyplayerPageRoutingModule } from './myplayer-routing.module';

import { MyplayerPage } from './myplayer.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyplayerPageRoutingModule,
    TranslateModule
  ],
  declarations: [MyplayerPage]
})
export class MyplayerPageModule {}
