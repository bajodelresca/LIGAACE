import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditmyplayerPageRoutingModule } from './editmyplayer-routing.module';

import { EditmyplayerPage } from './editmyplayer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditmyplayerPageRoutingModule
  ],
  declarations: [EditmyplayerPage]
})
export class EditmyplayerPageModule {}
