import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewteamPageRoutingModule } from './newteam-routing.module';

import { NewteamPage } from './newteam.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewteamPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [NewteamPage]
})
export class NewteamPageModule {}
