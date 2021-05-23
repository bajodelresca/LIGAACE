import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeamcalendarPageRoutingModule } from './teamcalendar-routing.module';

import { TeamcalendarPage } from './teamcalendar.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeamcalendarPageRoutingModule,
    TranslateModule
  ],
  declarations: [TeamcalendarPage]
})
export class TeamcalendarPageModule {}
