import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyplayerPage } from './myplayer.page';

const routes: Routes = [
  {
    path: '',
    component: MyplayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyplayerPageRoutingModule {}
