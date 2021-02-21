import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormpPageRoutingModule } from './formp-routing.module';

import { FormpPage } from './formp.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormpPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [FormpPage]
})
export class FormpPageModule {}
