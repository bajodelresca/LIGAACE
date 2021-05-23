import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamestatsPageRoutingModule } from './gamestats-routing.module';

import { GamestatsPage } from './gamestats.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamestatsPageRoutingModule,
    TranslateModule,
    ReactiveFormsModule
  ],
  declarations: [GamestatsPage]
})
export class GamestatsPageModule {}
