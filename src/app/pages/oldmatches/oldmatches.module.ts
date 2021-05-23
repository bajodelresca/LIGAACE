import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OldmatchesPageRoutingModule } from './oldmatches-routing.module';

import { OldmatchesPage } from './oldmatches.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OldmatchesPageRoutingModule,
    TranslateModule
  ],
  declarations: [OldmatchesPage]
})
export class OldmatchesPageModule {}
