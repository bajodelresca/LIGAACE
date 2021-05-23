import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OldmatchesPage } from './oldmatches.page';

const routes: Routes = [
  {
    path: '',
    component: OldmatchesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OldmatchesPageRoutingModule {}
