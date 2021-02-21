import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewteamPage } from './newteam.page';

const routes: Routes = [
  {
    path: '',
    component: NewteamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewteamPageRoutingModule {}
