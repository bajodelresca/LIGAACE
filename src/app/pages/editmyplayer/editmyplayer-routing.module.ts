import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditmyplayerPage } from './editmyplayer.page';

const routes: Routes = [
  {
    path: '',
    component: EditmyplayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditmyplayerPageRoutingModule {}
