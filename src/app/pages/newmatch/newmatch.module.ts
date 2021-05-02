import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewmatchPageRoutingModule } from './newmatch-routing.module';

import { NewmatchPage } from './newmatch.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewmatchPageRoutingModule
  ],
  declarations: [NewmatchPage]
})
export class NewmatchPageModule {}
