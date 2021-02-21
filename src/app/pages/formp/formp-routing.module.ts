import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormpPage } from './formp.page';

const routes: Routes = [
  {
    path: '',
    component: FormpPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormpPageRoutingModule {}
